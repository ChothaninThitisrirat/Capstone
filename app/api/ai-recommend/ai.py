import numpy as np
from sentence_transformers import SentenceTransformer, util
import pandas as pd
from fastapi import FastAPI, HTTPException, Form
import asyncio
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
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI()
load_dotenv()

origin = [
    "http://localhost:3000",
    "http://localhost:4000",
    "http://superdoggez.trueddns.com:10610",
    "http://superdoggez.trueddns.com:10611"
    "http://superdoggez.trueddns.com:10611",
    "http://192.168.1.69/4000",
    "http://192.168.1.69/3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_methods=["POST"],
    allow_headers=["*"]
)

@app.post('/api/ai-recommend/')
async def process_data(data: dict):
    model_name = 'distilbert-base-nli-mean-tokens'         #import AI model
    model = SentenceTransformer(model_name)
    print('Processing data...')
    try:
        if not data:
            raise HTTPException(status_code=400, detail='No JSON data provided')

        user = data.get('user_id')                         
    
        if user is None:
            raise HTTPException(status_code=400, detail='Input data not found or not valid')

        conn = psycopg2.connect(
        host="localhost",
        database="b-trade",
        user="admin",
        password="admin123"
        )
        cur = conn.cursor(cursor_factory=RealDictCursor)

        cur.execute('''
        SELECT c.name
        FROM "User" u
        JOIN "Userlike" ul ON u.id = ul.user_id
        JOIN "Category" c ON ul.category_id = c.id
        WHERE u.id = %s
        ''', (user,))
        user_cat = [row['name'].strip() for row in cur.fetchall()]         #Get the categories
        print(user_cat)

        cur.execute('''
        SELECT b.id, b.title, b.picture, b.description, u.username, u.profile_picture, u.id userid
        FROM "Book" b
        JOIN "User" u ON b.user_id = u.id
        JOIN "BookCategory" bc ON b.id = bc.book_id
        JOIN "Category" c ON bc.category_id = c.id
        WHERE b.status = 'available'
        AND "isPost_trade" = TRUE
        AND b.user_id <> %s
        ''', (user,))
        books = cur.fetchall()

        books_category = []
        for book in books:
            cur.execute('''
            SELECT c.name
            FROM "BookCategory" bc
            JOIN "Category" c ON bc.category_id = c.id
            ''', )
            books_category.append([row['name'] for row in cur.fetchall()])

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
                    "id" : book['id'],
                    "title"  : book['title'],
                    "picture" : book['picture'],
                    "description" : book['description'],
                    "User": {
                        "username": book['username'],
                        "profile_picture" : book['profile_picture'],
                        "id" : book['userid'],
                    }
                }
                
                if recommendation["id"] not in id:
                    recommendations.append(recommendation)
                    id.append(recommendation["id"])
                    

            watched_book = user_cat[i]
            recommendations_dict[watched_book] = recommendations

        cur.close()
        conn.close()

        return {                                                        #Return books
            "recommend" : recommendations_dict
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/api/ai-recommend/book')
async def process_data(data: dict):
    model_name = 'distilbert-base-nli-mean-tokens' 
    model = SentenceTransformer(model_name)
    print('Processing data...')
    try:
        if not data:
            raise HTTPException(status_code=400, detail='No JSON data provided')

        book_id = data.get('book_id')
        
        if book_id is None:
            raise HTTPException(status_code=400, detail='Input data not found or not valid')

        conn = psycopg2.connect(
        host="localhost",
        database="b-trade",
        user="admin",
        password="admin123"
        )
        cur = conn.cursor(cursor_factory=RealDictCursor)

        conn = psycopg2.connect(
        host="localhost",
        database="b-trade",
        user="admin",
        password="admin123"
        )
        cur = conn.cursor(cursor_factory=RealDictCursor)

        cur.execute(''' SELECT c.name
            FROM "Book" b
            JOIN "BookCategory" bc ON b.id = bc.book_id
            JOIN "Category" c ON bc.category_id = c.id
            WHERE b.id = %s'''
        , (book_id,))
        book_cat = [row['name'] for row in cur.fetchall()]
        print(book_cat)

        cur.execute('''
        SELECT b.id, b.title, b.picture, b.description, u.username, u.profile_picture, u.id userid
        FROM "Book" b
        JOIN "User" u ON b.user_id = u.id
        JOIN "BookCategory" bc ON b.id = bc.book_id
        JOIN "Category" c ON bc.category_id = c.id
        WHERE b.status = 'available'
        AND "b.isPost_trade" = TRUE
        AND b.id <> %s
        ''', (book_id,))
        books = cur.fetchall()

        books_category = []
        for book in books:
            cur.execute('''
                SELECT c.name
                FROM "BookCategory" bc
                JOIN "Category" c ON bc.category_id = c.id
            ''', )
            books_category.append([row['name'] for row in cur.fetchall()])

        print(books_category)

        encoded_book_cat = model.encode(book_cat, show_progress_bar=True)
        print(encoded_book_cat)
        encoded_book_category = model.encode(books_category, show_progress_bar=True)
        print(encoded_book_category)
        result = np.concatenate((encoded_book_cat, encoded_book_category), axis=0)

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
                    "id" : book['id'],
                    "title"  : book['title'],
                    "picture" : book['picture'],
                    "description" : book['description'],
                    "User": {
                        "username": book['username'],
                        "profile_picture" : book['profile_picture'],
                        "id" : book['userid'],
                    }
                }
                
                if recommendation["id"] not in id:
                    recommendations.append(recommendation)
                    id.append(recommendation["id"])

            watched_book = book_cat[i]
            recommendations_dict[watched_book] = recommendations

        cur.close()
        conn.close()

        return {
            "recommend" : recommendations_dict
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='192.168.1.69', port=4000)

