export const revalidateTag = async (tag: string) => {
  await fetch(
    `http://localhost:3000/api/revalidate?tag=${tag}&secret=AREALLYLONGSTRINGOFCHARACTERSTHATYOUSHOULDGENERATE`,
    { method: "POST" }
  );
};
