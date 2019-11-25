
Live Link: https://appstractor.herokuapp.com/

Art Credit:
Background from Unsplash (https://unsplash.com/photos/F8nUWfdo_AI)    
Icons from Vecteezy (https://www.vecteezy.com) and oNline Web Fonts (http://www.onlinewebfonts.com/icon) 

Purpose: Appstractor serves to provide users with a means of creating abstract art at the click of a button. Furthermore, the content can be downloaded in order to share online or print as wall art. Given that any image can be converted into an appstraction, there exists an infinite supply of source material for users to man ipulate.  

Technologies: 
Node.js
Express
Mongoose
EJS
Capture-Chrome 
jQuery
Iframe
Unsplash API via AJAX

Technologies Overview:
This app relies on Node.js for its back-end functionality. More specifically, the installed npm dependencies include: express, mongoose, ejs, and capture-chrome. The server relies on an express object for its routing, and mongoose to connect it with mongoDB for data storage. Given the complexities of the rendering script, EJS was opted over React/JSX due to greater familiarity with its dom manipulation techniques. Finally, the app's ability to download the browser window as a png file stems from the capture-chrome npm, which serves as an intermediary shortcut to puppeteer's screen capturing capabilities. 

Notes:
1. Puppeteer screen capture does not work with heroku or repository setup; 
instructions.txt file provided on how to manually convert html download to png. 

2. Given user authorization has not yet been implemented, a variable located in the controller file 
serves to simulate the app's functionality with a specified user. 

Approach:
The app begins on the index route, which simply exists as a landing page. The page's script relies on setInterval() to continuously update the background.

From there the user can direct themselves to the new route via the render navigation link, in order to create content. Imbedded on this page is an iframe that sources the blank route, which in turn renders a blank.ejs file containing the main script for generating appstractions. While the buttons on the rendering interface should ideally be scripted within the new.ejs file (where their html resides), research showed it was far simpler to access these nodes from the iframe(blank.ejs), than it was to access the iframe's script from its parent window(show.ejs). It is for this reason that the event listeners for these buttons reside within the blank.ejs file. In regard to image selection, the user is able to either paste an html image link of their choosing, or use the provided unsplash api to randomly generate an image that relates to their query parameter. 

The blank route can be thought of as an extension of the new route, and takes in the current user's username as a data property. Had user authentication been included as a part of this project/unit, this data path would likely need to be structured differently. For the sake of simplicity, I instead defined a single test variable to represent the user model. The necessity of the user data property stems from the consideration that if multiple users were creating content, there would need to be a means of assigning their creations to their account. Thus, attaching a username to each document allows mongo's .find() method to return only documents with specific username values. Finally, to summarize the appstraction rendering script found within the blank.ejs file, it utilizes Math.random() and flexbox to generate mosaic patterns, and calculates the alignment of each cell's background to be relatively in range of the original image's x and y axis. To explain more directly, top portions of the original image will only appear in top cells of the appstraction, just as middle portions will appear in middle cells, and bottom portions in bottom cells. 

When the user clicks the save button, they initiate a post request that transfers the iframe's html as a string. In actuality, this node exists as a form disguised to look like a button, and has an invisible input tag that gets updated via the save button’s event handler. Due to the html content's large size, the middleware requires a 50mb limit to successfully pass the string. Matching the appstraction schema model, the req.body object passes a user and dom property to mongoDB via mongoose, and the server responds with status(204) to prevent the page from refreshing. In this specific case, the user experience benefits from being able to save multiple versions of the same image file, something that a page refresh would hinder. 

The gallery page serves as both the show route and edit route in order to further streamline the user experience. As its parameter, it passes all documents with a specified user property value (the current username) to the show.ejs file. In a similar fashion to the blank.ejs file, the data is passed to the script by first rendering it as text within an invisible div, and then retrieving that text via jQuery's text() method. Next, the data is used to define class properties that help keep track of a user's data length, document ids, and username. Since the page is not refreshed by the server  (in order to maintain a seamless interface), the script needs to virtually monitor content via these properties in order to update form actions and the iframe’s source attribute whenever the user clicks a gallery arrow or deletes a document.   

Further elaborating on the show/edit page, it contains 3 buttons: delete, download, and edit. Like the save button that exists on the rendering page, the delete and edit button are forms styled to appear as buttons. Clicking the delete button issues a delete request that passes the currently viewed document's id as a url parameter. The server then uses mongoose to find and delete this document, and updates the iframe’s source to show the next document in the gallery (or the previous, should the last document be the one to be deleted). Just like the render page has an embedded iframe that sources to the blank route, the gallery too utilizes an iframe, though this time sourcing to the saved route. 

While the save route could be set up to find a document by passing the current gallery index -- .find({}), (err, data) => render('saved.ejs',{data:data[req.params.index]}) --  it instead passes the document's id, as it is a more accurate method, and creates consistency with the delete route which requires the id over the current index. From there, the script obtains the document’s dom property  via jQuery's .text() method and injects it into a new body tag via jQuery's .html() method. Summarily, the biggest distinction between the saved.ejs file and the blank.ejs file, is that the saved.ejs file directly embeds the styling so that the downloadable html file can render accurately. 

Returning to the gallery/show page, clicking the edit button reveals a new panel in a similar fashion to the render/new page's link and search buttons. Like the delete route, the put route passes the currently viewed document's id as its action's url param. Again, the current index could have been used instead, though for accuracy and consistency id was preferred. Once received, the server updates the file via mongoose, and then returns a status 204 to avoid a page refresh. In this instance, the iframe does not need to be resourced as the dom inherently retains all edits. 

Finally, the app's most important button -- the download button -- sends a post request which passes the currently viewed document's id (again, this could have also been done with the current index number). On the server, capture-chrome is called and sent to the save route, where it records a screen capture of the browser. A timer of 7.5 seconds is implemented to allow enough time for the capture, and is paired with a download animation to keep the user updated. Once the time limit is reached, both an html file and PNG file are downloaded to the user's computer. The html file is included as a backup to the PNG file, in case the browser used is not chrome. 

While the capture phase could occur simultaneously with the post request on the render page -- and completely eliminate the need for a download timer -- I chose to store only one PNG file per user on my server. The reason for this is that in order to delete a PNG file from the server alongside the delete route, a PHP script would need to be implemented. In its absence, the PNG files would keep building up, and thus I opted to instead overwrite them by naming the PNG file "appstractor[Username].png".  Summarily, these files are downloaded to the user’s computer via a function that creates and auto clicks a link with a download and href attribute (the href being the location of the PNG file containing the user’s username). 

To conclude, I am providing a list of techniques that I discovered in the creation of this project which helped me solve various challenges: 

Techniques: 
1. .text() and .html() for passing data into an ejs file's script. 
2. disguising forms as buttons via css in order to create a consistently styled user interface 
3. invisible input text tags which also accomplished the above
4. accessing an iframe's parent nodes via parent.document in order to allow real time rendering
5. status 204 + resourcing iframes to keep a streamlined user experience by avoiding page refreshes 
6. layering iframes to prevent load in flash 

