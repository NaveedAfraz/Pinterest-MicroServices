import React, { useState } from 'react';
import { Heart, MoreHorizontal, Share2, ChevronUp, SmilePlus, Image, Send } from 'lucide-react';
import { useNavigate } from 'react-router';
function CommentsSection() {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: 'surfina',
        badge: 'S',
        badgeColor: 'bg-gray-200'
      },
      text: 'Love it ❤️',
      time: '3w',
      likes: 0,
      isLiked: false
    }
  ]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: {
          name: 'CurrentUser',
          badge: 'C',
          badgeColor: 'bg-blue-200'
        },
        text: newComment,
        time: 'now',
        likes: 0,
        isLiked: false
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };
  const navigate = useNavigate()
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg">
     
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-gray-700">
            <Heart size={20} className="mr-2" />
            <span className="text-sm font-medium">1.8k</span>
          </button>
          <button className="text-gray-700">
            <Share2 size={20} />
          </button>
          <button className="text-gray-700">
            <MoreHorizontal size={20} />
          </button>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-full font-medium">
          Save
        </button>
      </div>

    
      <div className="flex items-center p-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
          <button className="text-sm font-medium" onClick={() => navigate("/hello")}>A</button>
        </div>
        <span className="font-small">Ahahajajah</span>
      </div>
 
      <div className="border-t">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-medium text-sm">{comments.length} Comment</span>
          <button className="text-gray-700">
            <ChevronUp size={20} />
          </button>
        </div>
 
        <div className="px-4">
          {comments.map(comment => (
            <div key={comment.id} className="flex mb-4">
              <div className={`w-8 h-8 rounded-full ${comment.user.badgeColor} flex items-center justify-center mr-2 flex-shrink-0`}>
                <span className="text-sm font-medium">{comment.user.badge}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-start">
                  <div>
                    <span className="font-medium mr-2">{comment.user.name}</span>
                    <span>{comment.text}</span>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <span className="mr-2">{comment.time}</span>
                      <button className="mr-2 hover:text-gray-700">Reply</button>
                      <div className="flex items-center">
                        <button className="mr-1">
                          <Heart size={14} />
                        </button>
                        <button>
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommentsSection;