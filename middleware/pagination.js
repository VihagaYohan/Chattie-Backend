exports.paginate = (source)=>{
    return (req,res,next)=>{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        // calculating starting and  ending index
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results  = {};

        if(endIndex < source.length){
            results.next = {
                page:page +1,
                limit:limit
            };
        }

        if(startIndex > 0){
            results.previous = {
                page:page -1,
                limit:limit
            };
        }

        results.results = source.slice(startIndex,endIndex);
        res.paginatedResults = results;
        next();
    }
}

module.exports = paginate;