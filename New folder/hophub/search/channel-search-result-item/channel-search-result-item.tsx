import React from 'react';
import classNames from 'classnames';
import { SearchResultCard } from '@cloudrabbit/search.ui.search-result-card';
import { SearchResult } from '@cloudrabbit/search.entities.search-result';
import { Channel } from '@cloudrabbit/hophub.entities.channel';
import styles from './channel-search-result-item.module.scss';

export type ChannelSearchResultItemProps = {
  /**
   * The search result entity containing channel data.
   */
  result: SearchResult;

  /**
   * Custom class name for the component.
   */
  className?: string;

  /**
   * Inline styles for the component.
   */
  style?: React.CSSProperties;

  /**
   * Callback function when the item is clicked.
   */
  onClick?: () => void;
};

// Assuming this is what the SearchableContent interface from SearchResult package roughly looks like:
export interface ISearchableContent {
  id: string;
  title: string;
  url: string; // This is what the SearchResult entity expects as a navigation link
  toObject: () => any; // The entity package expects this method on its content
  description: string; // Changed from description?: string;
  type: string; // Made 'type' required as per SearchableContent interface
  keywords: string[]; // Made 'keywords' required
}

/**
 * Represents the searchable content for a Channel, conforming to the
 * ISearchableContent interface required by the SearchResult entity.
 * This class encapsulates a Channel entity and provides necessary methods/properties.
 */
export class ChannelSearchableContent implements ISearchableContent {
  public id: string;

  public title: string;

  public url: string;

  public description: string; // Changed from description?: string;

  public type: string; // Made 'type' required

  public keywords: string[]; // Made 'keywords' required

  public channelData: Channel; // The actual Channel entity

  constructor(channel: Channel, baseUrl: string = '/hophub/channels') {
    this.channelData = channel;
    this.id = channel.id;
    this.title = channel.name;
    this.description = channel.description; // channel.description is always a string from PlainChannel type
    this.url = `${baseUrl}/${channel.id}`;
    this.type = 'Channel'; // Ensure type is always set
    this.keywords = [channel.name.toLowerCase(), 'hophub', channel.type, ...this.extractKeywordsFromDescription(channel.description)];
  }

  private extractKeywordsFromDescription(description: string): string[] {
    if (!description) return []; // Check for empty string
    return description.toLowerCase().split(/\W+/).filter(word => word.length > 2);
  }

  toObject(): any {
    // This is a minimal representation of the object when serialized.
    // It includes all properties required by ISearchableContent and our specific channelData.
    return {
      id: this.id,
      title: this.title,
      url: this.url,
      description: this.description,
      type: this.type,
      keywords: this.keywords,
      channelData: this.channelData.toObject(),
    };
  }
}

const DEFAULT_CHANNEL_IMAGE = "https://storage.googleapis.com/bit-generated-images/images/image_a_modern__abstract_digital_ico_0_1770835145099.png";

export function ChannelSearchResultItem({
  result,
  className,
  style,
  onClick
}: ChannelSearchResultItemProps) {
  // Cast result.content to our ChannelSearchableContent class
  const searchableChannelContent = result.content as ChannelSearchableContent;
  const channel = searchableChannelContent.channelData; // Extract the actual Channel object

  const cardResult = {
    id: searchableChannelContent.id, // Use the ID from the content itself for the card
    title: searchableChannelContent.title,
    description: searchableChannelContent.description,
    imageUrl: DEFAULT_CHANNEL_IMAGE, // Use a default image for channels
    link: searchableChannelContent.url, // Use 'url' here for the card's 'link'
    type: searchableChannelContent.type || 'Channel', // Use content type or default to 'Channel'
    data: {
      channelId: channel.id,
      ownerId: channel.ownerId,
      visibility: channel.type, // ChannelVisibility 'public' | 'private'
      membersCount: channel.memberIds?.length || 0,
      relevanceScore: result.relevanceScore,
    },
  };

  return (
    <SearchResultCard
      result={cardResult}
      className={classNames(styles.channelSearchResultItem, className)}
      style={style}
      onClick={onClick}
    />
  );
}