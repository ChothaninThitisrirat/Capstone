from fastapi import FastAPI, HTTPException, Form
import asyncio
import os
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI()
load_dotenv()



@app.post('/api/ai-collab/')
async def process_data(data: dict):

    

    try:
        if not data:
            raise HTTPException(status_code=400, detail='No JSON data provided')

        user_id = data.get('user_id')                         
    
        if user_id is None:
            raise HTTPException(status_code=400, detail='Input data not found or not valid')
        conn = psycopg2.connect(
        host="localhost",
        database="b-trade",
        user="admin",
        password="admin123"
        )
        cur = conn.cursor(cursor_factory=RealDictCursor)

        cur.execute("""
        SELECT user_id,
            COALESCE("นวนิยาย", ROUND((3),2)) AS "นวนิยาย",
            COALESCE("สยองขวัญ", ROUND((3),2)) AS "สยองขวัญ",
            COALESCE("การ์ตูน", ROUND((3),2)) AS "การ์ตูน",
            COALESCE("โรแมนติก", ROUND((3),2)) AS "โรแมนติก",
            COALESCE("วิทยาศาสตร์", ROUND((3),2)) AS "วิทยาศาสตร์",
            COALESCE("การเงิน - ลงทุน", ROUND((3),2)) AS "การเงิน - ลงทุน",
            COALESCE("การศึกษา", ROUND((3),2)) AS "การศึกษา",
            COALESCE("ท่องเที่ยว", ROUND((3),2)) AS "ท่องเที่ยว",
            COALESCE("พัฒนาตนเอง", ROUND((3),2)) AS "พัฒนาตนเอง",
            COALESCE("สุขภาพ", ROUND((3),2)) AS "สุขภาพ"
        FROM (
            SELECT user_id,
                MAX(CASE WHEN name = 'นวนิยาย' THEN score END) AS "นวนิยาย",
                MAX(CASE WHEN name = 'สยองขวัญ' THEN score END) AS "สยองขวัญ",
                MAX(CASE WHEN name = 'การ์ตูน' THEN score END) AS "การ์ตูน",
                MAX(CASE WHEN name = 'โรแมนติก' THEN score END) AS "โรแมนติก",
                MAX(CASE WHEN name = 'วิทยาศาสตร์' THEN score END) AS "วิทยาศาสตร์",
                MAX(CASE WHEN name = 'การเงิน - ลงทุน' THEN score END) AS "การเงิน - ลงทุน",
                MAX(CASE WHEN name = 'การศึกษา' THEN score END) AS "การศึกษา",
                MAX(CASE WHEN name = 'ท่องเที่ยว' THEN score END) AS "ท่องเที่ยว",
                MAX(CASE WHEN name = 'พัฒนาตนเอง' THEN score END) AS "พัฒนาตนเอง",
                MAX(CASE WHEN name = 'สุขภาพ' THEN score END) AS "สุขภาพ"
            FROM (
                SELECT u.id AS user_id, ca.name, ROUND(AVG(rb.score),2) AS score
                FROM public."Review_Book" rb
                JOIN public."User" u ON rb.user_id = u.id
                JOIN public."Book" b ON rb.book_id = b.id
                JOIN public."BookCategory" bc ON b.id = bc.book_id
                JOIN public."Category" ca ON ca.id = bc.category_id
                WHERE u.id = %s
                GROUP BY ca.name, u.id
            ) user_avg_score
            GROUP BY user_id
        ) output;
        """, (user_id,))
        user_avg = cur.fetchall()
        print(user_avg)

        cur.execute("""
        SELECT user_id,
            COALESCE("นวนิยาย", ROUND((3),2)) AS "นวนิยาย",
            COALESCE("สยองขวัญ", ROUND((3),2)) AS "สยองขวัญ",
            COALESCE("การ์ตูน", ROUND((3),2)) AS "การ์ตูน",
            COALESCE("โรแมนติก", ROUND((3),2)) AS "โรแมนติก",
            COALESCE("วิทยาศาสตร์", ROUND((3),2)) AS "วิทยาศาสตร์",
            COALESCE("การเงิน - ลงทุน", ROUND((3),2)) AS "การเงิน - ลงทุน",
            COALESCE("การศึกษา", ROUND((3),2)) AS "การศึกษา",
            COALESCE("ท่องเที่ยว", ROUND((3),2)) AS "ท่องเที่ยว",
            COALESCE("พัฒนาตนเอง", ROUND((3),2)) AS "พัฒนาตนเอง",
            COALESCE("สุขภาพ", ROUND((3),2)) AS "สุขภาพ"
        FROM (
            SELECT user_id,
                MAX(CASE WHEN name = 'นวนิยาย' THEN score END) AS "นวนิยาย",
                MAX(CASE WHEN name = 'สยองขวัญ' THEN score END) AS "สยองขวัญ",
                MAX(CASE WHEN name = 'การ์ตูน' THEN score END) AS "การ์ตูน",
                MAX(CASE WHEN name = 'โรแมนติก' THEN score END) AS "โรแมนติก",
                MAX(CASE WHEN name = 'วิทยาศาสตร์' THEN score END) AS "วิทยาศาสตร์",
                MAX(CASE WHEN name = 'การเงิน - ลงทุน' THEN score END) AS "การเงิน - ลงทุน",
                MAX(CASE WHEN name = 'การศึกษา' THEN score END) AS "การศึกษา",
                MAX(CASE WHEN name = 'ท่องเที่ยว' THEN score END) AS "ท่องเที่ยว",
                MAX(CASE WHEN name = 'พัฒนาตนเอง' THEN score END) AS "พัฒนาตนเอง",
                MAX(CASE WHEN name = 'สุขภาพ' THEN score END) AS "สุขภาพ"
            FROM (
                SELECT u.id AS user_id, ca.name, ROUND(AVG(rb.score),2) AS score
                FROM public."Review_Book" rb
                JOIN public."User" u ON rb.user_id = u.id
                JOIN public."Book" b ON rb.book_id = b.id
                JOIN public."BookCategory" bc ON b.id = bc.book_id
                JOIN public."Category" ca ON ca.id = bc.category_id
                WHERE u.id <> %s 
                GROUP BY ca.name, u.id
            ) all_avg_score
            GROUP BY user_id
        ) output;
        """, (user_id,))

        all_user_avg = cur.fetchall()
        print(all_user_avg)

        cur.close()
        conn.close()

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='192.168.1.69', port=4001)
