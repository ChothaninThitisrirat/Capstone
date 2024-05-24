import numpy as np
from sentence_transformers import SentenceTransformer, util
import pandas as pd
from fastapi import FastAPI, HTTPException, Form
import asyncio
from prisma import Prisma
from dotenv import load_dotenv
import os
from scipy.spatial.distance import pdist
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import PCA
from datetime import datetime
import math

app = FastAPI()
load_dotenv()


@app.post('/api/ai')
async def process_data(data: dict):
    prisma = Prisma()
    await prisma.connect()
    model_name = 'distilbert-base-nli-mean-tokens' 
    model = SentenceTransformer(model_name)
    print('Processing data...')
    try:
        if not data:
            raise HTTPException(status_code=400, detail='No JSON data provided')

        user = data.get('user_id')
        

        if user is None:
            raise HTTPException(status_code=400, detail='Input data not found or not valid')

        user_data = await prisma.user.find_unique(
            where={
                "id": int(user)
            },
            include={
                "Userlike" :
                 {
                    "include" : {
                        "Category":True,
                    }
                }
            }
        )
        
        user_cat = [cat.Category.name.strip() for cat in user_data.Userlike]
        print(user_cat)
        books = await prisma.book.find_many(
            where={
                "status": "available",
                "isPost_trade": True,
                'NOT': [
                    {
                        "user_id": int(user)
                    }
                ]
            },
            include={
                "category":True,
                "User":True
            }
        )

        
        books_category = [[category.name for category in book.category] for book in books]
        print(books_category)

        encoded_user_cat = model.encode(user_cat, show_progress_bar=True)
        encoded_book_category = model.encode(books_category, show_progress_bar=True)
        result =  np.concatenate((encoded_user_cat, encoded_book_category), axis=0)
        exp_size = np.size(user_cat)
        X = np.array(result)
        cos_sim_data = pd.DataFrame(cosine_similarity(X))
        recommendations_dict = {}
        for i in range(exp_size):
            index_recomm = cos_sim_data.loc[i][exp_size:].sort_values(ascending=False).index.tolist()[0:math.ceil(10 / len(user_cat))]
            recomm = [x - exp_size for x in index_recomm]
            cat_data = [books[i] for i in recomm]
            recommendations = []
            for book in cat_data:
                recommendation = {
                    "book_id" : book.id,
                    "title"  : book.title,
                    "picture" : book.picture,
                    "description" : book.description,
                    "username": book.User.username,
                    "user_profile" : book.User.profile_picture,
                    "user_id" : book.User.id
                }
                recommendations.append( recommendation )
            
            watched_book = user_cat[i]
            recommendations_dict[watched_book] = recommendations
            print(recommendations_dict)
        return {
            "recommend" : recommendations_dict
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=4000)

