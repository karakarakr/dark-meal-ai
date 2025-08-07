import {
    Container,
    Image,
    Text,
    Title,
    Textarea,
    Button,
    Group,
    Box,
    Divider,
    Avatar,
    Stack,
    Paper,
  } from '@mantine/core';
  import { useState } from 'react';
  
  export default function RecipePage() {
    const [comments, setComments] = useState([
      {
        id: 1,
        author: 'JohnDoe',
        avatar: 'https://i.pravatar.cc/100?img=1',
        text: 'Looks delicious! I will try it soon.',
      },
      {
        id: 2,
        author: 'JaneSmith',
        avatar: 'https://i.pravatar.cc/100?img=2',
        text: 'Great recipe, thanks for sharing!',
      },
    ]);
    const [newComment, setNewComment] = useState('');
  
    const handleAddComment = () => {
      if (!newComment.trim()) return;
  
      const newCommentObj = {
        id: Date.now(),
        author: 'CurrentUser',
        avatar: 'https://i.pravatar.cc/100?img=3',
        text: newComment,
      };
      setComments((prev) => [newCommentObj, ...prev]);
      setNewComment('');
    };
  
    return (
      <Container size="md" py="xl">
        {/* Section 1: Image */}
        <Box mb="md">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_8QgpXEXt66DvkNO1dhHkz2EmxbJbsQsLLw&s"
            radius={10}
            alt="Recipe"
            style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover' }}
          />
        </Box>
  
        {/* Section 2: Content */}
        <Box mb="xl">
          <Title order={1} mb="sm">
            Best Homemade Lasagna
          </Title>
          <Text mb="sm">
            This lasagna recipe is the ultimate comfort food! It’s made with layers of
            pasta, rich meat sauce, creamy béchamel, and lots of cheese. Perfect for
            family dinners or special occasions.
          </Text>
          <Group position="apart" mt="lg">
            <Text size="sm" italic>
              Created at: 2025-08-07
            </Text>
            <Text size="sm" italic>
              Updated at: 2025-08-07
            </Text>
          </Group>
        </Box>
  
        <Divider my="lg" />
  
        {/* Section 3: Add Comment */}
        <Box mb="xl">
          <Textarea
            placeholder="Write your comment..."
            autosize
            minRows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.currentTarget.value)}
          />
          <Button mt="sm" onClick={handleAddComment}>
            Add Comment
          </Button>
        </Box>
  
        <Divider my="lg" />
  
        {/* Section 4: Comments */}
        <Stack>
          {comments.map((comment) => (
            <Paper key={comment.id} p="md" radius="md" withBorder>
              <Group align="flex-start" spacing="md">
                <Box>
                  <Avatar src={comment.avatar} radius="xl" />
                  <Text align="center" size="xs" mt="xs">
                    {comment.author}
                  </Text>
                </Box>
                <Text>{comment.text}</Text>
              </Group>
            </Paper>
          ))}
        </Stack>
      </Container>
    );
  }
  