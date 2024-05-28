export const acceptedemailTemplate = `<div>Your request for <b>{{bookname}}</b> from {{owner}} in exchange for <b>{{reqbook}}</b> has been accepted</div>
                        <div>You can check more about this trade information at b-trade.com</div>
                        <div>Thank you <b>{{user}}</b> for using b-trade. :)</div>`;

export const declinedemailTemplate = `<div>Your request for <b>{{bookname}}</b> from {{owner}} in exchange for <b>{{reqbook}}</b> has been declined</div>
                        <div>You can check more about this trade information at b-trade.com</div>
                        <div>Thank you <b>{{user}}</b> for using b-trade. :)</div>`

export const returnemailTemplate = `<div>Your trading between you and {{user}} for <b>{{reqbook}}</b> and <b>{{bookname}}</b> has been return</div>
                        <div>You can check about this trade history information at b-trade.com</div>
                        <div>Thank you <b>{{owner}}</b> for using b-trade. :)</div>`

export const requestemailTemplate = `<div>{{user}} has request to trade <b>{{bookname}}</b> in exchange for <b>{{reqbook}}</b></div>
                        <div>You can accept, decline or check for more infromation about this at b-trade.com</div>
                        <div>Thank you <b>{{owner}}</b> for using b-trade. :)</div>`