import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const views =
    (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

  return (
    <div className="min-h-screen bg-black">
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />
      <div className="relative bg-black">
        {/* Colorful gradient spots in background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-500/20 via-blue-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-radial from-purple-500/15 via-purple-500/3 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-gradient-radial from-emerald-500/15 via-emerald-500/3 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-radial from-rose-500/10 via-rose-500/2 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        {/* Simple content container */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800/50 shadow-2xl">
            <article className="px-8 py-12 prose prose-zinc prose-quoteless prose-invert max-w-none">
              <Mdx code={project.body.code} />
            </article>
          </div>
        </div>
        <div className="h-24"></div>
      </div>
    </div>
  );
}
