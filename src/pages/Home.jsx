import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const limit = 5; // Number of posts per fetch

    const loadPosts = async () => {
        setLoading(true);
        try {
            const result = await appwriteService.getPosts([], limit, offset);
            if (result) {
                setPosts((prevPosts) => {
                    const existingIds = new Set(prevPosts.map(post => post.$id));
                    const newPosts = result.documents.filter(
                        (newPost) => !existingIds.has(newPost.$id)
                    );
                    return [...prevPosts, ...newPosts];
                });
                setHasMore(result.documents.length === limit);
                setOffset(prevOffset => prevOffset + limit);
            }
        } catch (error) {
            console.error("Error loading posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;
    
            // Trigger loadPosts when the user has scrolled halfway through the document
            if (scrollTop + windowHeight >= fullHeight / 2 && !loading && hasMore) {
                loadPosts();
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore]);
    

    if (loading && posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                </Container>
            </div>
        );
    }

    if (!loading && posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            No posts available
                        </h1>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <h1 className="text-3xl font-bold text-center mb-8">
                    Latest Posts
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
                {loading && posts.length > 0 && (
                    <div className="flex justify-center items-center h-16 mt-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;
