type User = {
    name: string;
    avatar: string;
    rank: number;
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export const UserPredictionCard: React.FC<Props> = (props) => {
  return (
	<div {...props}>
	  {/* Add your component content here */}
	</div>
  );
}