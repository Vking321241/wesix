import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, useParams } from 'react-router-dom';
import './plugin-globals.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './app/page';
import BlogListingPage from './app/blog/page';
import BlogArticleClient from './app/blog/[slug]/BlogArticleClient';
import BlogPreviewPage from './app/blog/preview/page';
import FeaturesPage from './app/features/page';
import PricingPage from './app/pricing/page';
import AboutPage from './app/about/page';

function BlogArticleWrapper() {
  const { slug } = useParams<{ slug: string }>();
  return <BlogArticleClient slug={slug || ''} />;
}

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-light-bg text-text-gray">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogListingPage />} />
            <Route path="/blog/preview" element={<BlogPreviewPage />} />
            <Route path="/blog/:slug" element={<BlogArticleWrapper />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

const container = document.getElementById('wesix-blog-root');
if (container) {
  createRoot(container).render(<App />);
}
