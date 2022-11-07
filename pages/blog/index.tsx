import { useEffect,useState } from "react";
import Container from "@/components/Container";
import BlogStyles from "@/components/BlogStyles";
import BlogPostFilter from "@/components/BlogPostFilter";
import { blogContent } from "@/data/content";
import { getClassify } from "../../api/articles";
import { useSelector } from "react-redux";
import { blogCount } from "../../store/bilog/index";

import { GetStaticProps } from "next";
import { useMidgard } from '../../store/bilog/hooks'

export const getStaticProps: GetStaticProps = async () => {
  try {
    return {
      props: {
        blog: blogContent,
      },
    };
  } catch {
    return {
      props: {
        blog: blogContent,
      },
    };
  }
};

const Blog = ({ blog, feed }) => {
  const blogList = useSelector(blogCount);
  const { getTxData} = useMidgard()
  const [classifyData,setClassifyData]= useState([])
  const ongetClassify = async()=>{
    const {data} = await getClassify();
    setClassifyData(data.data.datalist)
  }
  useEffect(() => {
    getTxData({ pageNum: 1, pageSize: 10 })
    ongetClassify()
  }, []);
  return (
    <Container title={blog.meta.title} description={blog.meta.description}>
      <BlogStyles>
        <main className="blog">
          <BlogPostFilter
            blog={blog}
            feed={blogList.datalist}
            classify={classifyData}
          />
        </main>
      </BlogStyles>
    </Container>
  );
};

export default Blog;
