const createAndFillUserTable = (db, SQL_script, userData) => {
    db.serialize(() => {
        db.run(SQL_script)

        db.get(`SELECT * FROM Users WHERE id = ?`, [1], (err, row) => {
            if (err) {
                throw Error(err)
            }

            if(!row){
                db.run(`BEGIN;`)
                userData.map(item => {
                    db.run(`INSERT INTO 'Users' (id, first_name, last_name,email,gender,ip_address)
                VALUES ('${item.id}','${item.first_name}','${item.last_name}','${item.email}','${item.gender}','${item.ip_address}')`
                    )
                })
                db.run(`COMMIT`)
            }
        })
    })
}

const createAndFillUserStatistic = (db, SQL_script, userStatistic) => {
    db.serialize(() => {
        db.run(SQL_script)
        db.get(`SELECT * FROM UsersStatistic WHERE user_id = ?`, [101], (err,row) => {
            if (err) {
                throw Error(err)
            }
            if(!row){
                db.run(`BEGIN;`)
                userStatistic.map(item => {
                    db.run(`INSERT INTO 'UsersStatistic'(user_id, 'date', page_views, clicks)
                            VALUES ('${item.user_id}','${item.date}','${item.page_views}','${item.clicks}')`)

                })
                db.run(`COMMIT`)
            }
        })
    })
}

const getSumOfViewsAndClicks = (db) => {
    db.serialize(() => {
        db.run(`BEGIN;`)
        db.all(`SELECT user_id, SUM(page_views) sumViews, SUM(clicks) sumClicks FROM UsersStatistic GROUP BY user_id`,
            (err,rows) => {
            if (err) {
                throw Error(err)
            }
            rows.forEach(row => {
                db.run(`UPDATE Users SET 
                 total_clicks = '${row.sumViews}',
                 total_page_views = '${row.sumClicks}'
                 WHERE id = '${row.user_id}'
                 `)
            });
        })
        db.run(`COMMIT`)
    })
}

module.exports = {
    createAndFillUserStatistic,
    getSumOfViewsAndClicks,
    createAndFillUserTable
}