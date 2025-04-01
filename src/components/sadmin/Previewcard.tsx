import styles from "../../styles/Previewcard.module.scss";
import { VscPlayCircle } from "react-icons/vsc";
import { MdOutlineVideoLibrary } from "react-icons/md";
import Image from "next/image";

interface PreviewCardProps {
  image: string;
  title: string;
  description: string;
  duration: string;
  link: string;
}

const PreviewCard: React.FC<PreviewCardProps> = ({
  image,
  title,
  description,
  duration,
  link,
}) => {
  return (
    <div>
      <p>Preview</p>
      <div className={styles.previewCard}>
        <Image
          src={image}
          alt={title}
          width={350}
          height={200}
          quality={80}
          placeholder="blur"
          blurDataURL="/assets/placeholder.png" // Add a low-res placeholder
          className={styles.image}
        />
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.meta}>
            <span className={styles.iconText}>
              <MdOutlineVideoLibrary className={styles.icon} /> Video
            </span>
            <span className={styles.iconText}>
              <VscPlayCircle className={styles.icon} /> {duration}
            </span>
          </div>
          <p className={styles.description}>{description}</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.visitLink}
          >
            Visit Link
          </a>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
