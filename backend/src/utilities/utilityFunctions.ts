export const isObjectEmpty= (obj:object):boolean => 
{
    for(let _keys in obj)
    {
        return false;
    }
    return true;
}