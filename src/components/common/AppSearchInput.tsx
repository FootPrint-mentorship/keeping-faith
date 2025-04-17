import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  JSX,
  useEffect,
  useState,
} from "react";
import useDebounce from "@/hooks/useDebouncer";
import { IoSearch } from "react-icons/io5";
import styles from "../../styles/recordManagement.module.scss";

interface SearchInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onSearchDone: (value: string) => void;
}

const AppSearchInput = ({
  className,
  onSearchDone,
  onReset,
  ...props
}: SearchInputProps): JSX.Element => {
  const [value, setValue] = useState("");

  const debouncedSearch = useDebounce(value, 500);

  useEffect(() => {
    onSearchDone(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className={styles.searchContainer}>
      <IoSearch className={styles.searchIcon} />

      <input
        className={styles.search}
        onChange={(e) => setValue(e?.target?.value)}
        value={value}
        {...props}
        type="search"
      />

      <button className={styles.searchButton}>Search</button>
    </div>
  );
};

export default AppSearchInput;
