import React from "react";
import { registerRoot, Still } from "remotion";
import {ArchiveMark, ChannelAvatar, ChannelBanner, IllustratedChannelBanner} from "./Branding";

// Standalone entry: no changes to episode compositions, rig, audio or exports.
const BrandingRoot: React.FC = () => <>
  <Still id="Channel-Logo-Transparent" component={ArchiveMark} width={1024} height={1024}/>
  <Still id="Channel-Avatar" component={ChannelAvatar} width={1000} height={1000}/>
  <Still id="Channel-Banner" component={ChannelBanner} width={2560} height={1440}/>
  <Still id="Channel-Banner-Illustrated" component={IllustratedChannelBanner} width={2560} height={1440}/>
</>;
registerRoot(BrandingRoot);
