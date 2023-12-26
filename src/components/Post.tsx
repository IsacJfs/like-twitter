import Avatar from "./Avatar";
import Button from "./Button";
import Input from "./Input";
import PostFeed from "./posts/PostFeed";

const Post = () => {

  const handleOnChange = () => {
    console.log('handleOnChange')
  }

  return (
    <div className="text-white">
      <section className="grid grid-cols-[40px_auto] gap-2 px-3 pt-3">
        <div className='max-w-40 pt-3'>
          <Avatar userId="5"/>
        </div>
        <div className=''>
          <Input placeholder="O que você está pensando?" onChange={handleOnChange} type='textarea'/>
          <div className='py-3 flex justify-end'>
            <Button label='Postar' onClick={handleOnChange}/>
          </div>
        </div>
      </section>
      <PostFeed/>
    </div>
  );
}

export default Post;
