// import { useEffect } from "react";
import { css } from "@emotion/react";
import { homeContent } from "@/data/content";
import Container from "@/components/Container";
import TypingAnimation from "@/components/TypingAnimation";
import FeaturedPost from "@/components/FeaturedPost";
import { CtaButtons } from "@/components/CtaButtons";
// import { useSelector, useDispatch } from "react-redux";
// import { bilogCount } from "../store/bilog/index";
import { getArticles } from "../api/articles";
// import { useMidgard } from "../store/bilog/hooks";

import dynamic from "next/dynamic";
const CanvasLoader = dynamic(() => import("@/components/CanvasLoader"), {
  ssr: false,
});

import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await getArticles({
      pageNum: 1,
      pageSize: 1,
      lately: "1",
    });
    const latestPost = "222";
    const featuredPost = {
      slug: data.data.datalist[0].id,
      title: data.data.datalist[0].article_name,
      teaser: data.data.datalist[0].article_name,
    };
    return {
      props: {
        home: homeContent,
        featuredPost,
        latestPost: latestPost,
      },
    };
  } catch {
    return { props: { home: homeContent } };
  }
};

export default function Home({ home, featuredPost, latestPost }) {
  // const dispatch = useDispatch();
  // const { getTxData } = useMidgard();
  // useEffect(() => {
  //   dispatch(getTxData({ pageNum: 1, pageSize: 1, lately: 1 }));
  // }, []);
  const styleMain = css({
    display: "flex",
    "@media (max-width: 890px)": {
      flexDirection: "column",
    },
  });
  const styleMainLeft = css({
    padding: "0 2rem 0 0",
    animation: "slideUpSection .8s forwards",
    "@media (max-width: 890px)": {
      flexDirection: "column-reverse",
    },
    "@media (max-width: 480px)": {
      padding: 0,
    },
  });
  const styleContent = css({
    ".titleWrapper": {
      marginBottom: "3rem",
      "@media(max-width: 480px)": {
        marginBottom: "2rem",
      },
    },
    ".intro, .typed": {
      display: "block",
      margin: "2rem 0",
    },
    ".typed": {
      "&:before": {
        content: '"> ~ % "',
        color: "var(--color-primary)",
      },
      "@media(max-width: 480px)": {
        fontSize: 13,
      },
    },
    h1: {
      lineHeight: "100%",
      fontFamily: "var(--font-secondary)",
      fontSize: "calc(3.5vw + 3.5vh)",
      fontWeight: 800,
      WebkitMarqueeIncrement: "0vw",
    },
  });
  const styleCtaButtons = css({
    display: "flex",
    flexDirection: "row",
  });
  const styleMainRight = css({
    position: "relative",
    background: "var(--color-gradient)",
    height: "72vh",
    "@media (max-width: 890px)": {
      height: "45vh",
      marginTop: "2rem",
    },
  });
  return (
    <Container title={home.meta.title}>
      <main css={styleMain} className="home">
        <div css={styleMainLeft} className="animationWrapper">
          <div css={styleContent}>
            <div className="titleWrapper">
              <span className="typed" aria-hidden="true">
                <TypingAnimation data={home.typed} />
              </span>
              <h1>{home.title}</h1>
            </div>
            <div css={styleCtaButtons}>
              <CtaButtons items={home.items} />
            </div>
            <FeaturedPost
              home={home}
              featuredPost={featuredPost}
              latestPost={latestPost}
            />
          </div>
        </div>
        <div css={styleMainRight} className="animationWrapper">
          <CanvasLoader />
        </div>
      </main>
    </Container>
  );
}
