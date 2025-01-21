export default {
    name: "product",
    type: "document",
    title: "Product",
    fields: [
      { name: "title", type: "string", title: "Title" },
      { name: "price", type: "number", title: "Price" },
      { name: "oldPrice", type: "number", title: "Old Price" },
      { name: "discount", type: "number", title: "Discount" },
      { name: "rating", type: "number", title: "Rating" },
      {
        name: "imgSrc",
        type: "image",
        title: "Image",
        options: { hotspot: true },
      },
    ],
  };
  