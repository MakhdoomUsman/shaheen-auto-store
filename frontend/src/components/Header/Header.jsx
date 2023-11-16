import Link from "next/link";
import React from "react";
import Container from "../Container/Container";

const Header = () => {
  const header = [
    {
      name: "Dashbaord",
      slug: "/",
    },
    {
      name: "Invenstory",
      slug: "/inventory",
    },
    {
      name: "Suppliers",
      slug: "/suppliers",
    },
    {
      name: "Customers",
      slug: "/customers",
    },
    {
      name: "Category",
      slug: "/categories",
    },
    {
      name: "Sub Category",
      slug: "/sub-categories",
    },
    {
      name: "Brands",
      slug: "/brands",
    },
  ];
  return (
    <div>
      <Container>
        <div className="flex my-5 gap-5 justify-between items-center">
          {header.map((item, id) => (
            <Link href={item?.slug} className="text-sm" key={id}>
              {item.name}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Header;
