import Head from 'next/head';
import { FC } from 'react';

interface HeadComponentProps {
    title: string;
    description: string;
    keywords: string;
    imageUrl?: string;
    canonicalUrl?: string;
}

const HeadComponent: FC<HeadComponentProps> = ({ title, description, keywords, imageUrl, canonicalUrl }) => (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Decorify" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {imageUrl && <meta name="twitter:image" content={imageUrl} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Head>
);

export default HeadComponent;
