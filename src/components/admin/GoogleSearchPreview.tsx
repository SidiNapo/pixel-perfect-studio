interface GoogleSearchPreviewProps {
  title: string;
  description: string;
  url: string;
}

const GoogleSearchPreview = ({ title, description, url }: GoogleSearchPreviewProps) => {
  const displayUrl = url || 'https://yoursite.com/blog/your-post-slug';
  const displayTitle = title || 'Your SEO Title Will Appear Here';
  const displayDescription = description || 'Your meta description will appear here. Make it compelling to increase click-through rates from search results.';

  return (
    <div className="bg-secondary/50 border border-border rounded-lg p-4">
      <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Google Search Preview</p>
      
      <div className="bg-card rounded-lg p-4 border border-border">
        {/* URL */}
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-xs text-muted-foreground">E</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">E-SEOMAX Blog</p>
            <p className="text-xs text-green-500 truncate max-w-[300px]">{displayUrl}</p>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-lg text-blue-400 hover:underline cursor-pointer mb-1 line-clamp-1">
          {displayTitle}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {displayDescription}
        </p>
      </div>
      
      {/* Character counts */}
      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
        <span className={title.length > 60 ? 'text-destructive' : ''}>
          Title: {title.length}/60
        </span>
        <span className={description.length > 160 ? 'text-destructive' : ''}>
          Description: {description.length}/160
        </span>
      </div>
    </div>
  );
};

export default GoogleSearchPreview;
