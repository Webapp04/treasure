import Base from "./Base";

export default class FileApi extends Base {
  async generateCDNLink(data, type) {
    const formData = new FormData();
    formData.append("file", data);
    formData.append("type", type);

    return super.post("file", formData);
  }

  async generateIPFSLink(file) {
    const formData = new FormData();
    formData.append("file", file);

    return super.post("file/ipfs", formData);
  }

  async generateMetadataLink(metadata) {
      return super.post("file/ipfs-metadata", {metadata});
  }
}
