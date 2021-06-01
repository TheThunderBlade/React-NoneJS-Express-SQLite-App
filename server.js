const express = require('express')
const config = require('config')
const sqlite3 = require('sqlite3').verbose()
const path = require('path');
const cors = require('cors')

const PORT = process.env.PORT || config.get('port')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());

const db = new sqlite3.Database('MyDataBase.db', (err) => {
    if (err) {
        throw Error(err)
    }
    console.log('Connected to the SQlite database.')
})

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/user/userData', (req,res) => {
    try{
        db.all(`SELECT * FROM Users`, (err, rows) => {
            if (err) {
                throw Error(err)
            }
            let userData = []
            rows.forEach(row => {
                userData = [...userData, row]
            })
            return res.status(200).send(userData)
        })
    } catch (e) {
        console.log(e)
    }
})

app.post('/api/user/userFullName', (req, res) => {
    try {
        const {userId} = req.body

        db.serialize(() => {
            db.get(`SELECT first_name, last_name FROM Users WHERE id = ?`, [userId], (err, rows) => {
                if (err) {
                    throw Error(err)
                }

                return res.status(200).send(rows)
            })

        })
    }catch (e) {
        console.log(e)
    }
})

app.post('/api/user/userStatistic', (req, res) => {
    const {userId} = req.body
    try {
        db.serialize(() => {
            db.all(`SELECT date,page_views,clicks FROM UsersStatistic WHERE user_id = ?`, [userId], (err, rows) => {
                if (err) {
                    throw Error(err)
                }

                return res.status(200).send(rows)
            })
        })
    }catch (e) {
        console.log(e)
    }
})

app.post('/api/user/getStatisticByInterval', (req,res) => {
    const {dateFrom, dateTo, userId} = req.body
    const startPoint = dateFrom[2]+'-'+dateFrom[1]+'-'+dateFrom[0]
    const endPoint = dateTo[2]+'-'+dateTo[1]+'-'+dateTo[0]
    try {
        db.serialize(() => {
            db.all(`SELECT date,page_views,clicks FROM UsersStatistic WHERE date >= ? AND date <= ? AND user_id = ?`,
                [startPoint, endPoint, userId],
                (err, rows) => {
                    if (err) {
                        throw Error(err)
                    }

                    return res.status(200).send(rows)
                })
        })

    }catch (e) {
        console.log(e)
    }

})

const userData = require('./users.json')
const userStatistic = require('./users_statistic.json')

const createUserTableSQL = `CREATE TABLE IF NOT EXISTS Users
                        (
                            id INTEGER PRIMARY KEY,
                            first_name VARCHAR(100),
                            last_name VARCHAR(100),
                            email VARCHAR(256),
                            gender VARCHAR(10),
                            ip_address VARCHAR(100),
                            total_clicks INTEGER,
                            total_page_views INTEGER 
                        )`

const createUserStatisticTableSQL = `CREATE TABLE IF NOT EXISTS UsersStatistic
                        (
                           user_id INTEGER,
                           'date' DATE,
                           page_views INTEGER,
                           clicks INTEGER 
                        )`


const {
    createAndFillUserStatistic,
    getSumOfViewsAndClicks,
    createAndFillUserTable
} = require('./SQL_func/SQL_func')

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.listen(PORT, error => {
    if (error) {
        throw Error(error)
    }
    console.log(`Server is running on port ${PORT}`)
    createAndFillUserTable(db, createUserTableSQL, userData)
    createAndFillUserStatistic(db, createUserStatisticTableSQL, userStatistic)
    getSumOfViewsAndClicks(db)
})

