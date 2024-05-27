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
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
load_dotenv()

origin = [
    
    "http://superdoggez.trueddns.com:10610"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_methods=["POST"],
    allow_headers=["*"]
)

@app.post('/api/ai')
async def process_data(data: dict):
    prisma = Prisma()
    await prisma.connect()                                 #Connect to Database with prisma python
    model_name = 'distilbert-base-nli-mean-tokens'         #import AI model
    model = SentenceTransformer(model_name)
    print('Processing data...')
    try:
        if not data:
            raise HTTPException(status_code=400, detail='No JSON data provided')

        user = data.get('user_id')                         
    
        if user is None:
            raise HTTPException(status_code=400, detail='Input data not found or not valid')

        user_data = await prisma.user.find_unique(          #Find categories that user like
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
        
        user_cat = [cat.Category.name.strip() for cat in user_data.Userlike]            #Get the categories
        print(user_cat)
        books = await prisma.book.find_many(                                            #Get book in database thai is post trade and not trading
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

        
        books_category = [[category.name for category in book.category] for book in books]      #Get all book categories in array
        print(books_category)

        encoded_user_cat = model.encode(user_cat, show_progress_bar=True)                       #Tranform user categories into matrix
        print(encoded_user_cat)
        encoded_book_category = model.encode(books_category, show_progress_bar=True)            #Tranform book categories into matrix
        print(encoded_book_category)
        result =  np.concatenate((encoded_user_cat, encoded_book_category), axis=0)             #Combine the 2 matrix 

        user_cat_size = np.size(user_cat)                                        
        X = np.array(result)                                                                    #Tranfrom into array
        cos_sim_data = pd.DataFrame(cosine_similarity(X))                                       #Use cosine similarity to find the closest categories book
        recommendations_dict = {}
        id = []

        for i in range(user_cat_size):
            index_recomm = cos_sim_data.loc[i][user_cat_size:].sort_values(ascending=False).index.tolist()[0:math.ceil(10 / len(user_cat))]      
            recomm = [x - user_cat_size for x in index_recomm]
            cat_data = [books[i] for i in recomm]
            recommendations = []
            
            for book in cat_data:                                       #Store the closest categories book in dictionary
                recommendation = {
                    "id" : book.id,
                    "title"  : book.title,
                    "picture" : book.picture,
                    "description" : book.description,
                    "User": {
                        "username": book.User.username,
                        "profile_picture" : book.User.profile_picture,
                        "id" : book.User.id,
                    }
                }
                
                if recommendation["id"] not in id:
                    recommendations.append(recommendation)
                    id.append(recommendation["id"])

            watched_book = user_cat[i]
            recommendations_dict[watched_book] = recommendations
    
        return {                                                        #Return books
            "recommend" : recommendations_dict
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/api/ai/book')
async def process_data(data: dict):
    prisma = Prisma()
    await prisma.connect()
    model_name = 'distilbert-base-nli-mean-tokens' 
    model = SentenceTransformer(model_name)
    print('Processing data...')
    try:
        if not data:
            raise HTTPException(status_code=400, detail='No JSON data provided')

        book_id = data.get('book_id')
        

        if book_id is None:
            raise HTTPException(status_code=400, detail='Input data not found or not valid')

        book_data = await prisma.book.find_unique(
            where={
                "id": int(book_id)
            },
            include={
                "category":True
            }
        )
        
        book_cat = [category.name for category in book_data.category]
        print(book_cat)
        books = await prisma.book.find_many(
            where={
                "status": "available",
                "isPost_trade": True,
                'NOT': [
                    {
                        "id": int(book_id)
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

        encoded_book_cat = model.encode(book_cat, show_progress_bar=True)
        print(encoded_book_cat)
        encoded_book_category = model.encode(books_category, show_progress_bar=True)
        print(encoded_book_category)
        result =  np.concatenate((encoded_book_cat, encoded_book_category), axis=0)

        exp_size = np.size(book_cat)
        X = np.array(result)
        cos_sim_data = pd.DataFrame(cosine_similarity(X))
        recommendations_dict = {}
        print(recommendations_dict)
        id = []
        for i in range(exp_size):
            index_recomm = cos_sim_data.loc[i][exp_size:].sort_values(ascending=False).index.tolist()[0:math.ceil(10 / len(book_cat))]
            recomm = [x - exp_size for x in index_recomm]
            cat_data = [books[i] for i in recomm]
            recommendations = []
            
            for book in cat_data:
                recommendation = {
                    "id" : book.id,
                    "title"  : book.title,
                    "picture" : book.picture,
                    "description" : book.description,
                    "User": {
                        "username": book.User.username,
                        "profile_picture" : book.User.profile_picture,
                        "id" : book.User.id,
                    }
                }
                
                if recommendation["id"] not in id:
                    recommendations.append(recommendation)
                    id.append(recommendation["id"])

            watched_book = book_cat[i]
            recommendations_dict[watched_book] = recommendations
    
        return {
            "recommend" : recommendations_dict
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=4000)

