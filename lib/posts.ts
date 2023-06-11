import fs from "fs";
import path from "path";
import matter from 'gray-matter'
import {remark} from "remark"
import html from "remark-html";

// the current working directory is joined together with the string 'blogposts' and stored in a variable postDirectory
const postsDirectory = path.join(process.cwd(), 'blogposts')

//declared with the export  so can be imported into other modules
export function getSortedPostsData() {
    //get file names under /posts
    //read all files and directorie inside the postsDirectory
    //synchronously with fs.readdirSync(postsDirectory). The resulting array of filenames is stored in fileNames.
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((filename) => {
        //remove .md from filename to get id
        // using regex and replace method looping through each array element
        const id = filename.replace(/\.md$/, "");

        // builds the full path to the markdown file
        const fullPath = path.join(postsDirectory, filename);
        // read markdown file as a string
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        //use gray-matter to parse the post metadata section
        //resulting object is stored in matterResult. This object typically contains a data property which holds all the metadata (YAML front matter) defined in the markdown file.
        const matterResult = matter(fileContents);

        /*
            Creates a new object blogPost with properties id, title, and date. 
            The id comes from the filename, and title and date are obtained from the metadata parsed by gray-matter
        */
        const blogPost: BlogPost = {
            id,
            title: matterResult.data.title, 
            date: matterResult.data.date, 
        }
        
        /*
            returns the blogPost object. The result is an array of these objects, stored in allPostsData.
        */
        return blogPost;
    });

    // use of a ternary statement to return 1 if true and -1 if false

    /*
        sorts the allPostsData array by the date property in descending order, using the sort() method. 
        The sort comparison function (a, b) => a.date < b.date ? 1 : -1 returns 1 if a.date is less than b.date (i.e., a is more recent than b), and -1 otherwise. 
        This effectively sorts the posts from the most recent to the oldest.
        function finally returns the sorted array of blog post data.
    */
    return allPostsData.sort((a, b) => a.date <b.date ? 1 : -1);
    
}


export async function getPostData(id: string) {
        // builds the full path to the markdown file
        const fullPath = path.join(postsDirectory, `${id}.md`);
        // read markdown file as a string
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        //use gray-matter to parse the post metadata section
        //resulting object is stored in matterResult. This object typically contains a data property which holds all the metadata (YAML front matter) defined in the markdown file.
        const matterResult = matter(fileContents);

        const processedContent = await remark()
            .use(html)
            .process(matterResult.content);
        
        const contentHtml = processedContent.toString();

        /*
            Creates a new object blogPost with properties id, title, and date. 
            The id comes from the filename, and title and date are obtained from the metadata parsed by gray-matter
            this then uses that same blogpost but joins the contentHtml as string to the blogPost so that it expands the data within the type
        */

            // this 
        const blogPostWithHTML: BlogPost & {contentHtml: string} = {
            id,
            title: matterResult.data.title, 
            date: matterResult.data.date,
            contentHtml,
        }
        
        /*
            returns the blogPost object. The result is an array of these objects, stored in allPostsData.
        */
        return blogPostWithHTML;
    }
