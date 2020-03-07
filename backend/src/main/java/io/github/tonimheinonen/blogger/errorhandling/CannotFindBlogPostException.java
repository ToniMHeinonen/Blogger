package io.github.tonimheinonen.blogger.errorhandling;

public class CannotFindBlogPostException extends
        IllegalArgumentException {
    
    private long blogPostId;

    public CannotFindBlogPostException(long id) {
        blogPostId = id;
    }
    public long getBlogPostId() {
        return blogPostId;
    }
}