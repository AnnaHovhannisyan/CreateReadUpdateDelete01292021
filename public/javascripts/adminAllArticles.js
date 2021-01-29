let articleDeletes=document.querySelectorAll('.delete');

for(let articleDelete of articleDeletes){

    articleDelete.addEventListener('click',(e)=>{
        e.preventDefault();

        let objItem={_id:this.id};
        fetch('/admin/articles/article',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/JSON',
                'Accept':'application/JSON'
            },
            body:JSON.stringify(objItem)
        }).then(res=>{
            return res.json()
        }).then(result=>{
            console.log(result);
            if(result.n===1){
                articleDelete.parentNode.parentNode.remove()
            }

        })

    })

}
