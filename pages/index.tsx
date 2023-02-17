import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import Image from "next/image";
import Ingredients from "../components/Ingredients";

export type Ingredient = {
  name: string;
  type: string;
  uses: number;
  id: string;
};

export type Props = {
  ingredients: Ingredient[];
};
export const getStaticProps: GetStaticProps = async () => {
  const ingredients = await prisma.ingredient.findMany();
  return {
    props: { ingredients },
    revalidate: 10,
  };
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <div className="flex items-end">
          <h1 className="font-bold text-yellow-600">Another round</h1>
          <Image src="/cocktail.png" width="100" height="100" />
        </div>
        <main>
          <Ingredients ingredients={props.ingredients} />
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
