import React from "react";
import { Progress } from "@/components/ui/progress";
import { Item, ItemContent } from "./ui/item";

const FormProgress = ({ length, currentIndex }) => {
  const value = (currentIndex / (length - 1)) * 100;

  return (
    <Item variant="outline">
      <ItemContent>
        <div>node wrapper</div>
        <Progress value={value} />
      </ItemContent>
    </Item>
  );
};

export default FormProgress;
