export interface Document{
    id: string,
    title: string,
    content: string,
    created_at: Date,
    metadata?: Record <string, any>
}