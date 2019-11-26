//too short to use class
const renderSaved = () => {
    //create a new body; jQuery causes non-disruptive error
    const parse = document.createElement('body');
    //set new body's html via .text() to parse data string 
    $(parse).html($('#dom').text());
    //remove <script> from new body 
    $(parse).children().eq(3).remove();
    //add new body; jQuery causes non-disruptive error
    document.querySelector('html').appendChild(parse);
    //remove initial body
    $('#old').remove();
}
renderSaved();