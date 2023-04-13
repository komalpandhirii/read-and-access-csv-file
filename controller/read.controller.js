const path = require('path');
const config = require('../connection/connection');
const fs = require('fs')
const csvtojson = require('csvtojson');
const moment = require('moment');
const validator = require('validator');
const knex = require('../connection/connection');

const data = fs.readFileSync('/home/komal/Documents/csvAccessFile - Task/flat_file/pending_file/TXN_FILE_150320221113.txt','utf8')
 
const allData = data.toString().split('\n');

const getData = [];
let arr = [];
let err_count = 0;
let success_count = 0;
let total_count = 0;

const keys = allData[0].split('|')

for(let i = 1; i < allData.length ; i++){
    let singleData = allData[i].split('|')
    let jsonObj = {}

    for(let j= 0 ; j < singleData.length ; j++){
        jsonObj[keys[j]] = singleData[j]
    }

    getData.push(jsonObj);
}

let filename = path.basename('home/komal/Documents/csvAccessFile - Task/flat_file/pending_file/TXN_FILE_150320221113.txt')
let files = filename.split("_")
const fileValidation = files[2].split('.')

const main_function = async (req,res) => {

if(moment(fileValidation[0],"DDMMYYYYHHmm",true).isValid()){

if(keys.length == 4){

   if(keys[0] === 'TransactionDate' && keys[1] === 'CardNo' && keys[2] === 'Amount' && keys[3] === 'UniqueTransactionId'){

    for(let i = 0 ; i < getData.length; i++){
        let ERR = '';
        total_count = total_count + 1
        let currentDate = moment(new Date()).format('YYYY-MM-DD');

        if(getData[i].TransactionDate > currentDate){
            ERR += 'Date is greater than Current Date'
        }

        if(getData[i].CardNo.length != 12){
            ERR += 'Card Number Not Valid'
        }

        if(!validator.isNumeric(getData[i].Amount)){
            ERR += 'Amount is in not Numeric'
        }

        if(getData[i].CardNo === ''){
            ERR +=  'Card Number is not Mention'
        }

        if(!(moment(getData[i].TransactionDate ,'YYYYMMDD HH:mm:SS').isValid())){
            ERR += 'Transaction Date is not Valid'
        }

        let uniqueId = getData[i].UniqueTransactionId;

        if(arr.includes(uniqueId)){
            ERR += 'Transaction ID already exist'
        }
        else{
            arr.push(uniqueId);
        } 
        if(ERR != ''){
            err_count = err_count + 1
            Status = ERR
            failed = 'FAILED'
            getData[i].Status = failed
            getData[i].error = Status

        }
        else{
            success_count = success_count + 1
            success = 'SUCCESS'
            getData[i].Status = success

            let flatFile = {
                flatFileName : filename
            }

            console.log(flatFile);

        //   let transacDetail;

        //   knex('user')
        //   .select('memberId')
        //   .where('card_no' , getData[i].CardNo)
        //   .first().then((result) => knex('flat_file')
        //   .select('flatFileId')
        //   .orderBy("flatFileId" , "desc")
        //   .first()
        //   .then((result1) =>

        //    transacDetail = {
        //         unique_transaction_id : getData[i].UniqueTransactionId,
        //         memberId : result.memberId,
        //         flatFileId : result1.flatFileId,
        //         transaction_date : getData[i].TransactionDate,
        //         card_no : getData[i].CardNo,
        //         amount : getData[i].Amount,
        //   }
        //   ).then(() => knex('transactionTable').insert(transacDetail).then((result3) => console.log(result3)))
        //   )
        }

        let flat_id;
        let flat_file_data;

        if(total_count == (success_count + err_count)){
                knex("flat_file_data").select("flatFileId").orderBy("flatFileId", "desc").first().then((result)=> flat_id = result)
                .then(()=> flat_file_data = {
                    unique_transaction_id : getData[i].UniqueTransactionId,
                    transactionDate: getData[i].TransactionDate,
                    card_no:getData[i].CardNo,
                    amount:getData[i].Amount,
                    error: getData[i].error,
                    status:getData[i].Status
                }).then(()=> knex("flat_file_data").insert(flat_file_data).then((res)=> console.log(res)))
            }
    }

    // total_count = success_count + err_count

    // let flat_file = {
    //     file_name: filename,
    //     total_count: total_count,
    //     success_count: success_count,
    //     failure_count: err_count
    // }
    //  knex('flat_file').insert(flat_file)
    // .then ((result)=> console.log(result))
}
}
}
}

// const moveFunction = async(req,res) =>{

//     const handBackFileData = await knex('flat_file_data')
//     .select('unique_transaction_id','transactionDate','card_no','amount','status','error')
//     .where('status','FAILED')

//     let csvData = csvtojson(data,{
//         headers:"key"
//        })


//     console.log(csvData);

//     console.log(csvData);

    // res.send(handBackFileData);

// }

module.exports = { main_function ,
    //  moveFunction
} ;