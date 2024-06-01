


export const acceptedemailTemplate = 
                        `
                        <div>
                            <img src="{{logo}}"  width="300px"/>
                            <h1>อัพเดตสถานะการแลกเปลี่ยนหนังสือ</h1>
                            <h2>คำขอแลกเปลี่ยนหนังสือ  <b>"{{bookname}}"</b> ของคุณ <b>"{{owner}}"</b> ได้ตอบกลับยืนยันคำขอแลกเปลี่ยนของคุณ </h2>
                            <img src="{{image}}"  width="300px"/>
                            <h2>สามารถตรวจจสอบข้อมูลการแลกเปลี่ยนได้ที่ 
                                <a href="http://superdoggez.trueddns.com:10610">
                                    B-Trade
                                </a>
                            </h2>
                            <h3>
                                ขอขอบคุณ <b>{{user}}</b> ในการให้ความสนใจแลกเปลี่ยนหนังสือใน B-Trade :) 
                            </h3>
                        </div>`

export const declinedemailTemplate = 
                        `
                        <div>
                            <img src="{{logo}}"  width="300px"/>
                            <h1>อัพเดตสถานะการแลกเปลี่ยนหนังสือ</h1>
                            <h2>คำขอแลกเปลี่ยนหนังสือ  <b>"{{bookname}}"</b> ของคุณ <b>"{{owner}}"</b> ถูกปฏิเสธโดยเจ้าของหนังสือ </h2>
                            <img src="{{image}}"  width="300px"/>
                            <h2>สามารถตรวจจสอบข้อมูลการแลกเปลี่ยนได้ที่ 
                                <a href="http://superdoggez.trueddns.com:10610">
                                    B-Trade
                                </a>
                            </h2>
                            <h3>
                                ขอขอบคุณ <b>{{user}}</b> ในการให้ความสนใจแลกเปลี่ยนหนังสือใน B-Trade :) 
                            </h3>
                        </div>
                        `

export const returnemailTemplate = 
                        `<div>
                        <img src="{{logo}}"  width="300px"/>
                        <h1>อัพเดตสถานะการแลกเปลี่ยนหนังสือ</h1>
                        <h2>คำขอแลกเปลี่ยนหนังสือ <b>"{{bookname}}"</b> ของคุณ <b>"{{owner}}"</b> ได้รับการ ส่งคืนและสิ้นสุดกระบวนการแลกเปลี่ยนเรียบร้อยแล้ว  </h2>

                            <img src="{{image}}" width="300px"/>

                     <h2>สามารถตรวจสอบประวัติ และเลือกหนังสืออื่น ๆ เพิ่มเติมได้ที่
                            <a href="http://superdoggez.trueddns.com:10610">
                                B-Trade
                            </a>
                        </h2>
                        <h3>
                            ขอขอบคุณ <b>{{user}}</b> ในการให้ความสนใจแลกเปลี่ยนหนังสือใน B-Trade :) {{logo}}
                        </h3>
                        </div>`

export const requestemailTemplate = `
                        <div>
                            <img src="{{logo}}"  width="300px"/>
                            <h1>อัพเดตสถานะการแลกเปลี่ยนหนังสือ</h1>
                            <h2>หนังสือ  <b>"{{bookname}}"</b> ของคุณได้รับการส่งคำขอแลกเปลี่ยน </h2>
                            <img src="{{image}}"  width="300px"/>
                            <h2>สามารถตรวจจสอบข้อมูลการแลกเปลี่ยนได้ที่ 
                                <a href="http://superdoggez.trueddns.com:10610">
                                    B-Trade
                                </a>
                            </h2>
                            <h3>
                                ขอขอบคุณ <b>{{user}}</b> ในการให้ความสนใจแลกเปลี่ยนหนังสือใน B-Trade :) 
                            </h3>
                        </div>`



                     