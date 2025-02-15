import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';

interface Post {
  id: number;
  title: string;
  author: string;
  created_at: string;
  small_description: string;
  full_description: string;
}

type RouteParams = {
  params: {
    postId: number;
  };
};

export default function PostDetails() {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const { postId } = route.params || {}; // Adiciona verificação para route.params
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (postId) {
      getPostDetails();
    }
  }, [postId]);

  async function getPostDetails() {
    try {
      const { data, error } = await supabase.from("posts").select("*").eq("id", postId).single();
      if (error) {
        console.error("Error fetching post details:", error);
        return;
      }
      if (data) {
        setPost(data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>By {post.author}</Text>
      <Text style={styles.date}>{format(new Date(post.created_at), 'dd/MM/yyyy HH:mm')}</Text>
      <Text style={styles.description}>{post.full_description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
  },
});