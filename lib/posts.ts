import { fstat } from "fs";
import path from "path";
import matter from 'gray-matter'

const postsDrectory = path.join(process.cwd(), 'blogposts')

export function getSortedPostsData() {}