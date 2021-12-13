import { useState } from "react";
import { Form, useSubmit, useTransition } from "remix";

type LikeButtonProps = {
  id: string;
  _key: string;
  revisionId: string;
  term: string;
  likes: number;
};

export default function LikeButton(props: LikeButtonProps) {
  let { _key, term, revisionId, id, likes = 0 } = props;
  let [liked, setLiked] = useState(likes);
  let [effect, setEffect] = useState(false);
  let handleLike = () => {
    setLiked(liked + 1);
    setEffect(true);
  };
  const submit = useSubmit();
  const transition = useTransition();

  return (
    <span>
      <Form method="post">
        <input hidden name="_key" value={_key} readOnly />
        <input hidden name="term" value={term} readOnly />
        <input hidden name="revisionId" value={revisionId} readOnly />
        <input hidden name="id" value={id} readOnly />
        <button
          disabled={transition.state !== "idle"}
          onClick={handleLike}
          className={` hover:text-pink-600 ${effect && "animate-wiggle"}`}
          onAnimationEnd={() => setEffect(false)}
        >
          {" "}
          {liked} ❤️
        </button>
      </Form>
    </span>
  );
}
