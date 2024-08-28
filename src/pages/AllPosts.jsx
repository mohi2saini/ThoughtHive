import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import InfiniteScroll from 'react-infinite-scroll-component';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const limit = 5; // Number of posts per fetch

    const fetchPosts = async () => {
        const newPosts = await appwriteService.getPosts([/* your queries */], limit, offset);
        if (newPosts.documents.length < limit) {
            setHasMore(false);
        }
        setPosts([...posts, ...newPosts.documents]);
        setOffset(offset + limit);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className='w-full py-8'>
            <Container>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchPosts}
                    hasMore={hasMore}
                    loader={
                        <div className="flex justify-center items-center h-16 mt-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    }
                    endMessage={
                        <p className="text-center mt-4">No more posts to show</p>
                    }
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </Container>
        </div>
    );
}

export default AllPosts;
