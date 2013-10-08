
function getDB(req)
{
    var result = undefined;
    
    if (req)
    if (req.app)
    {
        var db = req.app.get("db");
        
        if (db)
        {
            console.log("The DB has been loaded: '%s'", db);
            
            result = db;
        }
        else
        {
            console.log("The DB could not be loaded");
        }
    }
    
    return result;
}

exports.watched = function(req, res)
{
    var db = getDB(req);
    
    res.render('list_goods', { title: 'List' });
};

exports.details = function(req, res)
{
    // TODO
    res.render('index', { title: 'Details' });
};

exports.add = function(req, res)
{
    res.render('add_good', { title: 'Add new' });
};

exports.new = function(req, res)
{
    console.log("Received the following request: '%s'", JSON.stringify(req.body));
    
    if (req.body)
    if (req.body.url)
    {
        console.log("Going to save the following URL in the DB: '%s'", req.body.url);
        
        var good = {
            
            "url": req.body.url
        };
        
        var db = getDB(req);
        
        db.find({"url": req.body.url}, function(err, results)
        {
            if (err)
            {
                console.log("Received the following error: '%s'", err);
                console.log("Aborting save...");
            }
            else
            {
                console.log("Results: '%s'", JSON.stringify(results));
                
                if (results.length > 0)
                {
                    console.log("Already present. Aborting save...");
                }
                else
                {
                    db.insert(good, function (error, doc)
                    {
                        if (error)
                        {
                            console.log("Received the following error: '%s'", error);
                        }
                        else if (doc)
                        {
                            console.log("Successfully saved the following document in the DB: '%s'", JSON.stringify(doc));
                        }
                        else
                        {
                            console.log("Received a generic error");
                        }
                    });
                }
            }
        });
    }
    
    // TODO
    res.render('add_good', { title: 'Add new' });
};

