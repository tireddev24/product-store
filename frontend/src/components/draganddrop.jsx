import { useState, useCallback } from "react";
import {
  Box,
  VStack,
  Text,
  Icon,
  Input,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { LuCloudUpload as LuUploadCloud, LuFileCheck } from "react-icons/lu";
import Spin from "./spinner";

const DragAndDropUpload = ({ handleFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Styling variables based on Chakra's theme
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const activeBorderColor = useColorModeValue("blue.500", "blue.300");
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const activeBgColor = useColorModeValue("blue.50", "whiteAlpha.200");

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
    }
  }, []);

  const onFileInputChange = async (e) => {
    setUploading(true);
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const image = await handleFileUpload(e);
      setImage(image);
      setFile(selectedFiles[0]);
      setUploading(false);
    }
  };

  return (
    <VStack spacing={4} w="full" mx="auto" p={4}>
      <Box
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        position="relative"
        w="full"
        h="200px"
        border="2px dashed"
        borderColor={isDragging ? activeBorderColor : borderColor}
        bg={isDragging ? activeBgColor : bgColor}
        borderRadius="xl"
        transition="all 0.2s"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        role="group"
      >
        {/* Hidden Input Layered Over Box */}
        <Input
          type="file"
          height="100%"
          width="100%"
          position="absolute"
          top="0"
          left="0"
          opacity="0"
          aria-hidden="true"
          accept="image/*" // Change as needed
          onChange={onFileInputChange}
        />

        <VStack spacing={2} pointerEvents="none">
          {image ? (
            <Image src={image} h={48} w={60} />
          ) : (
            <>
              {uploading ? (
                <>
                  <Spin />
                  <Text fontSize="lg" color={activeBorderColor}>
                    Uploading...
                  </Text>
                </>
              ) : (
                <>
                  <Icon
                    as={LuUploadCloud}
                    boxSize={8}
                    color={isDragging ? activeBorderColor : "gray.500"}
                  />
                  <Text
                    fontWeight="medium"
                    color={isDragging ? activeBorderColor : "gray.600"}
                  >
                    Drag & Drop to Upload
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    or click to browse files
                  </Text>
                </>
              )}
            </>
          )}
        </VStack>
      </Box>

      {/* Displaying Uploaded file */}
      {file && (
        <List spacing={2} w="full">
          <ListItem fontSize="sm" display="flex" alignItems="center">
            <ListIcon as={LuFileCheck} color="green.500" />
            {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </ListItem>
        </List>
      )}
    </VStack>
  );
};

export default DragAndDropUpload;
