import useSWR from "swr";

const useDrawer = () => {
  const { data: open, mutate: setOpen } = useSWR("drawerOpen", null, {
    fallbackData: false,
  });

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return { open, toggleDrawer };
};

export default useDrawer;