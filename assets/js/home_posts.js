
//method to submit the form data using ajax for new post
{
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function(data) {
                    new Noty({
                        theme: 'relax', 
                        text: "post published",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                    //.populate('user');
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    //req.flash('success', 'Post published');

                    deletePost($(` .delete-post-button`, newPost));

                }, error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }



    //method to create a post in DOM

    let newPostDom = function(post) {
        return $(` <li id="post-${post._id}">
                <p>
                    
                    <small>
                        <a class="delete-post-button" href="/post/destroy/${post._id}"> X </a>
                    </small>
                    
                    ${post.content}
                    <br>
                    <small>
                        ${post.user.name }
                    </small>
                </p>
                <div class="post-comments">
                    
                        <form action="/comments/create" method="post">
                            <input type="text" name="content" placeholder="type here to add comment..." required>
                            <input type="hidden" name="post" value=" ${post._id}">
                            <input type="submit" value="Add comment"> 
                        </form>
                    
            
                    <div class="post-comment-list">
                        <ul id="post-comments-${post._id}">
                            
                        </ul>
                    </div>
                </div>
                
            </li> `)
   }




   //method to delete a post from DOM
   let deletePost = function(deleteLink) {
       $(deleteLink).click(function(e) {
           e.preventDefault();

           $.ajax({
               type: 'get',
               url: $(deleteLink).prop('href'),
               success: function(data) {
                new Noty({
                    theme: 'relax', 
                    text: "post deleted",
                    type: 'error',
                    layout: 'topRight',
                    timeout: 1500
                }).show();
                   $(`#post-${data.data.post_id}`).remove();

               },error: function(error) {
                   console.log(error.responseText);
               }
           });
       });
   }







    createPost();
}