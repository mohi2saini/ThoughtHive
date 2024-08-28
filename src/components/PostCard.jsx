import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-white rounded-xl p-4 shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gray-50'>
                <div className='w-full mb-4'>
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className='w-full h-40 object-cover rounded-xl transition-transform duration-300 transform hover:scale-110'
                    />
                </div>
                <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
