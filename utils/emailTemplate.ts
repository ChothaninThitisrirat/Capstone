


export const acceptedemailTemplate = 
                        `<h1>คำขอแลกเปลี่ยนหนังสือ <b>{{bookname}}</b> ของคุณ <b>{{owner}}</b> ได้ตอบกลับยืนยันคำขอแลกเปลี่ยนของคุณ </h1>
                        <img src="{{image}}" />
                        <h3>สามารถตรวจจสอบข้อมูลการแลกเปลี่ยนได้ที่ 
                            <a href="http://superdoggez.trueddns.com:10610">
                                B-Trade
                            </a>
                        </h3>
                        <div>
                            ขอขอบคุณ <b>{{user}}</b> ในการให้ความสนใจแลกเปลี่ยนหนังสือใน B-Trade :) {{logo}}
                        </div>`

export const declinedemailTemplate = 
                        `<h1>คำขอแลกเปลี่ยนหนังสือ <b>{{bookname}}</b> ของคุณ <b>{{owner}}</b> ถูกปฏิเสธโดยเจ้าของหนังสือ </h1>
                        <img src="{{image}}" />
                        <h3>สามารถตรวจจสอบประวัติ และเลือกหนังสืออื่น ๆ เพิ่มเติมได้ที่
                            <a href="http://superdoggez.trueddns.com:10610">
                                B-Trade
                            </a>
                        </h3>
                        <div>
                            ขอขอบคุณ <b>{{user}}</b> ในการให้ความสนใจแลกเปลี่ยนหนังสือใน B-Trade :) {{logo}}
                        </div>`

export const returnemailTemplate = 
                        `<div>
                        <h1>อัพเดตสถานะการแลกเปลี่ยนหนังสือ</h1>
                        <h2>คำขอแลกเปลี่ยนหนังสือ <b>"{{bookname}}"</b> ของคุณ <b>"{{owner}}"</b> ได้รับการ <p sytle={'color:"#4CBB17';}">ส่งคืนและสิ้นสุดกระบวนการแลกเปลี่ยนเรียบร้อยแล้ว </p> </h2>

                            <img src="{{image}}" width="300px"/>

                     <h2>สามารถตรวจจสอบประวัติ และเลือกหนังสืออื่น ๆ เพิ่มเติมได้ที่
                            <a href="http://superdoggez.trueddns.com:10610">
                                B-Trade
                            </a>
                        </h2>
                        <h3>
                            ขอขอบคุณ <b>{{user}}</b> ในการให้ความสนใจแลกเปลี่ยนหนังสือใน B-Trade :) {{logo}}
                        </h3>
                        </div>`

export const requestemailTemplate = `<div>{{user}} has request to trade <b>{{bookname}}</b> in exchange for <b>{{reqbook}}</b></div>
                        <div>You can accept, decline or check for more infromation about this at b-trade.com</div> {{logo}}
                        <div>Thank you <b>{{owner}}</b> for using b-trade. :){{image}}</div>`



                        // <b>{{reqbook}}</b>