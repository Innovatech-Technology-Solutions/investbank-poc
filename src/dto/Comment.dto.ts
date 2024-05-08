interface IComment {
    id?: string | null;
    comment?: string | null;
    createdBy?: string | null;
    createdDate?: string | null;
    lastModifiedBy?: string | null;
    lastModifiedDate?: string | null;
    requestId?: string | null;
    taggedUsers?: string | null;
    url?: string | null;
    parentCommentId?: string | null;
    children?: any[];
  }