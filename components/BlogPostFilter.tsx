import { useState } from "react";
import { useTheme, css } from "@emotion/react";
import Image from "next/image";
// import { BlogListAsync, blogCount } from "../store/blog1";
import { useMidgard } from "../store/bilog/hooks";
import BlogStats from "@/components/BlogStats";
import BlogPost from "@/components/BlogPost";
import CloseButton from "@/components/CloseButton";
import compareID from "@/utils/compareID";
import { useSelector, useDispatch } from "react-redux";

const BlogPostFilter = ({ blog, feed, classify }) => {
  const dispatch = useDispatch();
  const { getTxData } = useMidgard();
  const styleBlogCategoryNav = css({
    overflow: "scroll",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    whiteSpace: "nowrap",
    minHeight: 32,
    li: {
      display: "inline",
      marginRight: "1.8rem",
      ".category":{
        // textTransform: "initial",
      }
    },
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "@media (max-width: 768px)": {
      minHeight: 32,
      li: {
        marginRight: "1.2rem",
      },
    },
  });

  const styleSearchPosts = css({
    display: "flex",
    position: "relative",
    caretColor: "var(--color-gray)",
    input: {
      fontSize: 15,
      marginBottom: 0,
    },
    ".icon": {
      position: "absolute",
      top: 16,
      right: 0,
      background: "var(--color-accent)",
      width: 35,
    },
    ".clearSearch": {
      display: "flex",
      justifyContent: "center",
      position: "absolute",
      width: 23,
      height: 23,
      top: 16.5,
      right: 8,
      cursor: "pointer",
    },
  });

  const theme: any = useTheme();

  const [search, setSearch] = useState("");

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleCategoryLink = (article_type: string) => {
    setSearch("#" + article_type);
    scrollToTop();
  };

  const handleClearFilters = () => {
    setSearch("");
    getTxData({
      pageNum: 1,
      pageSize: 10,
    });
    scrollToTop();
  };

  const activeCategories: Array<string> = Array.from(
    new Set(
      feed.map((post: Record<string, object>) => {
        return post.article_type;
      })
    )
  );

  const searchResults = (search: String, feed: Array<object>) => {
    // const categorySearch = search[0] === "#";
    // const categoryMatch =
    //   activeCategories.indexOf(search.slice(1).split(" ")[0]) > -1;

    // if (categorySearch) {
    //   if (categoryMatch) {
    //     return feed.filter(
    //       (data: { article_type: string; article_name: string }) =>
    //         data?.article_type
    //           ?.toLowerCase()
    //           .includes(search.slice(1).toLowerCase().split(" ")[0]) &&
    //         data?.article_name?.toLowerCase().includes(
    //           search
    //             .replace(/#[a-z]+/, "")
    //             .trim()
    //             .toLowerCase()
    //         )
    //     );
    //   }
    //   return feed.filter((data: { article_type: string }) =>
    //     data?.article_type
    //       ?.toLowerCase()
    //       .includes(search.slice(1).toLowerCase())
    //   );
    // }
    // return feed.filter((data: { article_name: string }) =>
    //   data?.article_name?.toLowerCase().includes(search.toLowerCase())
    // );
    return feed;
  };

  const filteredPosts = searchResults(search, feed);
  const RenderPosts: Function = () => {
    if (filteredPosts.length > 0) {
      return filteredPosts.map((post: Record<string, string>) => (
        <article className="publishedPost" key={post.id}>
          <button
            onClick={() => {
              getTxData({
                pageNum: 1,
                pageSize: 10,
                article_type: post.article_type,
              });
              handleCategoryLink(post.type);
            }}
            onKeyPress={() => handleCategoryLink(post.type)}
            className="category"
            aria-label={post.type}
          >
            {post.type}
          </button>
          <BlogPost post={post} />
        </article>
      ));
    } else {
      return (
        <span>
          {blog.search.noresult}{" "}
          {feed.length > 0 ? (
            <button
              onClick={() => {
                getTxData({
                  pageNum: 1,
                  pageSize: 10,
                });
                setSearch("")}}
              onKeyPress={() => setSearch("")}
              aria-label={blog.search.clear}
            >
              <CloseButton width={12} height={12} />
              {" " + blog.search.clear}
            </button>
          ) : null}
        </span>
      );
    }
  };

  const SearchIcon: Function = () => {
    if (search.length === 0) {
      return (
        <div className="icon">
          <Image
            src={theme.icons.search}
            height="23"
            width="23"
            priority
            alt={blog.search.placeholder}
            aria-label={blog.search.placeholder}
            draggable={false}
          />
        </div>
      );
    } else {
      return (
        <button
          onClick={() => {
            getTxData({
              pageNum: 1,
              pageSize: 10,
            });
            setSearch("")}}
          onKeyPress={() => setSearch("")}
          className="clearSearch"
        >
          <CloseButton width={25} height={25} />
        </button>
      );
    }
  };

  const ClearFilters: Function = () => {
    if (search[0] === "#" && filteredPosts.length > 0) {
      return (
        <button
          onClick={() => {
            getTxData({
              pageNum: 1,
              pageSize: 10,
            });
            handleClearFilters();
          }}
          onKeyPress={() => handleClearFilters()}
          aria-label="Clear Filter"
        >
          <CloseButton width={12} height={12} />
          <span>{" " + blog.search.clearFilter}</span>
        </button>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      <BlogStats
        feed={feed}
        activeCategories={activeCategories}
        filteredPosts={filteredPosts}
        classify={classify}
      />
      <nav css={styleBlogCategoryNav}>
        <ul>
          <li>
            <button
              onClick={() => {
                getTxData({
                  pageNum: 1,
                  pageSize: 10,
                });
                setSearch("");
              }}
              onKeyPress={() => setSearch("")}
              className={search === "" ? "category all active" : "category all"}
              aria-label="All"
            >
              All
            </button>
          </li>
          {classify.map((category, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  getTxData({
                    pageNum: 1,
                    pageSize: 10,
                    article_type: category.id,
                  });
                  handleCategoryLink(category.name);
                }}
                onKeyPress={() => handleCategoryLink(category.name)}
                className={
                  search.split(" ")[0] === "#" + category.name
                    ? "category active"
                    : "category"
                }
                aria-label={category.name}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div css={styleSearchPosts}>
        <input
          type="text"
          placeholder={blog.search.placeholder}
          value={search}
          aria-label={blog.search.placeholder}
          onChange={(e) => {
            getTxData({
              pageNum: 1,
              pageSize: 10,
              key: e.target.value,
            });
            setSearch(e.target.value);
          }}
        />
        <SearchIcon />
      </div>
      <div className="post">
        <RenderPosts />
        <ClearFilters />
      </div>
    </>
  );
};

export default BlogPostFilter;
