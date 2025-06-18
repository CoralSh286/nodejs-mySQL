/** @format */

import React, { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import "./style.css";
import CrudBar from "../../components/CrudBar/CrudBar";
import { apiRequest, useApiRequest } from "../../service/api";
import DisplayData from "../../components/DisplayData/DisplayData";
import { getUserId } from "../../helper/localStorageHelper";
import PageHeader from "../../components/PageHeader/PageHeader";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const userId = getUserId();
  const { data, loading, error, refetch } = useApiRequest({
    url: `/posts?userId=${userId}`,
    initialData: [],
  });

  useEffect(() => {
    if (data) {
      setPosts(data.data || []); // Ensure we set posts to an empty array if data is undefined
    }
  }, [data]);
  const searchQuery = async (form) => {
    const urlQuery = `/posts?userId=${userId}${
      form.title ? "&title=" + form.title : ""
    }${form.id ? "&id=" + form.id : ""}`;
    const data = await apiRequest({ url: urlQuery });
    setPosts(data.data || []);
  };
  const onDelete = async () => {
    if (!selected) return; // אם לא נבחרה משימה, אל תעשה כלום
    const { id } = selected; // קח את ה-id של המשימה הנבחרת
    const isDeleted = await apiRequest({
      url: `/posts/delete-post/${id}`,
      method: "DELETE",
    }); // מחק את המשימה מה-API
    if (!isDeleted || isDeleted.success === false) {
      return; // אם המחיקה נכשלה, אל תעשה כלום
    }
    setPosts(posts.filter((post) => post.id !== id)); // עדכן את הסטייט של המשימות
    setSelected(null); // נקה את הסטייט של המשימה הנבחרת
  };
    const updateFunction = (newData) => {
    setPosts(newData);
    setSelected(null);
  }
  return (
    <div className="posts-container">
      <CrudBar
        editingFor={"posts"}
        onDelete={onDelete}
        refetchFunction={refetch}
        updateFunction={updateFunction}
        additionalData={{ userId: userId }}
        selected={selected}
      />
      <PageHeader title={"Posts"} />
      <SearchBar onSubmit={searchQuery} />
      <DisplayData error={error} loading={loading} data={posts}>
        <div className="posts-grid">
          {posts.map((post) => (
            <Post
              key={post.id}
              {...post}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </div>
      </DisplayData>
    </div>
  );
}
