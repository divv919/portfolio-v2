import Image from "next/image";
import ArrowOnHover from "../components/ArrowOnHover";
import { getBlogsMetaData } from "../lib/mdx";
import Link from "next/link";

export default async function Blogs() {
  return (
    <div className="flex flex-col text-md gap-15 w-full tracking-tight ">
      <div className="w-full aspect-video lg:aspect-2/1 relative">
        <Image alt="bg" fill src="/aesthetic.jpg" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-neutral-300 leading-5">
          This section will be updated when i start writing blogs :)
        </div>
        <div className="text-neutral-400 flex gap-2">
          Till then follow me on{" "}
          <ArrowOnHover href="https://x.com/divv919">
            <span className="">x.com</span>
          </ArrowOnHover>
        </div>
      </div>
    </div>
  );
  const blogMetaData = await getBlogsMetaData();
  console.log("divyansh works");
  if (!blogMetaData || blogMetaData.length === 0) {
  }
  return (
    <div>
      {blogMetaData.map((blog, index) => {
        if (!blog) {
          return null;
        }
        return (
          <div key={index}>
            <Link href={`/blogs/${blog.slug}`}>{blog.frontmatter.title}</Link>
            <div className="w-full flex justify-between">
              <div className="flex gap-4w">
                <div>{blog.frontmatter.author}</div>
                <div>{blog.frontmatter.readTime}</div>
              </div>
              <div>{blog.frontmatter.date}</div>
            </div>
            <span>{blog.frontmatter.tags.join(", ")}</span>
            <p>{blog.frontmatter.description}</p>
          </div>
        );
      })}
    </div>
  );
}
