import React from 'react'; 
 
 type HubTab = 'hophub' | 'music' | 'gamehub' | 'spaces' | 'unified' | 'call'; 
 type SpaceSubTab = 'groups' | 'channels'; 
 
 interface HubNavTabsProps { 
   activeTab: HubTab; 
   activeSpaceTab?: SpaceSubTab; 
   onTabChange: (tab: HubTab) => void; 
   onSpaceTabChange?: (tab: SpaceSubTab) => void; 
 } 
 
 export const HubNavTabs: React.FC<HubNavTabsProps> = ({ 
   activeTab, 
   activeSpaceTab = 'groups', 
   onTabChange, 
   onSpaceTabChange, 
 }) => { 
   const mainTabs: { key: HubTab; label: string; icon: string }[] = [ 
    { key: 'hophub', label: 'HopHub', icon: '🌌' }, 
    { key: 'music', label: 'Music', icon: '🎵' }, 
    { key: 'gamehub', label: 'GameHub', icon: '🎮' }, 
    { key: 'spaces', label: 'Spaces', icon: '🚀' }, 
    { key: 'unified', label: 'Unified Hub', icon: '🎯' }, 
    { key: 'call', label: 'Call', icon: '📞' }, 
  ]; 
 
   const spaceSubTabs: { key: SpaceSubTab; label: string; icon: string }[] = [ 
     { key: 'groups', label: 'Groups', icon: '👥' }, 
     { key: 'channels', label: 'Channels', icon: '💬' }, 
   ]; 
 
   return ( 
     <> 
       {/* Main Tabs */} 
       <div className="flex border-b border-white/10 bg-black/20 backdrop-blur-sm"> 
         {mainTabs.map(tab => ( 
           <button 
             key={tab.key} 
             onClick={() => onTabChange(tab.key)} 
             className={` 
               flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 
               border-b-2 ${ 
                 activeTab === tab.key 
                   ? 'border-purple-500 text-purple-300 bg-purple-500/10' 
                   : 'border-transparent text-white/60 hover:text-white hover:bg-white/5' 
               } 
             `} 
           > 
             <span className="text-lg">{tab.icon}</span> 
             <span className="hidden sm:inline">{tab.label}</span> 
           </button> 
         ))} 
       </div> 
 
       {/* Space Sub-tabs - Only show when HopSpaces tab is active */} 
       {activeTab === 'hophub' && onSpaceTabChange && ( 
         <div className="flex border-b border-white/5 bg-black/30 backdrop-blur-md"> 
           {spaceSubTabs.map(tab => ( 
             <button 
               key={tab.key} 
               onClick={() => onSpaceTabChange(tab.key)} 
               className={` 
                 flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium transition-all duration-200 
                 border-b ${ 
                   activeSpaceTab === tab.key 
                     ? 'border-blue-500 text-blue-300 bg-blue-500/10' 
                     : 'border-transparent text-white/50 hover:text-white hover:bg-white/5' 
                 } 
               `} 
             > 
               <span className="text-sm">{tab.icon}</span> 
               <span>{tab.label}</span> 
             </button> 
           ))} 
         </div> 
       )} 
     </> 
   ); 
 };
