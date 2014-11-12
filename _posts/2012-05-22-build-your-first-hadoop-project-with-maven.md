---
layout: post
title: Build Your First Hadoop project with Maven
created: 1337721067
author: yanai
permalink: "/build-your-first-hadoop-project-maven"
tags:
- JAVA
- Hadoop Big Data Maven
---
<p>In <a href="http://www.tikalk.com/events/sessions/hadoop-and-bigdata-session">this fuse day</a> we jumped into the <a href="http://en.wikipedia.org/wiki/Big_data">BigData</a> world, and obviously, our first choice was <a href="http://hadoop.apache.org/">Hadoop</a>. Hadoop is a de-facto standard in the open source world today for large scale data processing. In this article I'll describe the &ldquo;baby steps&rdquo;, I took in order to set up my first Hadoop Java project, so it will be easier for any Hadoop newbie to kick start a Java Maven project.</p>
<p style="margin-bottom: 0cm">The first step is to install Hadoop in your working computer. There are <a href="http://wiki.apache.org/hadoop/GettingStartedWithHadoop">plenty of articles</a>, describing how to install Hadoop. This post assumes you have already set an environment for developing and running Hadoop, and will guide you what to do next..</p>
<p style="margin-bottom: 0cm">The first step after installing Hadoop, is to kick off a Maven project. This project might look different than a regular web project, you may have developed lately - Its NOT the typical web project, and naturally will NOT run within any web container. More than that, assuming you might be using some dependencies in your program, you probably want them to be part of the program classpath. Hadoop uses all jars within the &ldquo;lib&rdquo; directory of the output target jar, adding it to runtime classpath. To achieve this in Maven, we use the following assembly Maven file, located in src/main/assembly/hadoop-job.xml:</p>
<pre title="code" class="brush: xhtml;">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;

&lt;assembly xmlns=&quot;http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.0&quot; xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xsi:schemaLocation=&quot;http://maven.apache.org/plugins/maven-assembly-plugin/assembly/1.1.0
                        http://maven.apache.org/xsd/assembly-1.1.0.xsd&quot;&gt;

	&lt;id&gt;job&lt;/id&gt;
	&lt;formats&gt;
		&lt;format&gt;jar&lt;/format&gt;
	&lt;/formats&gt;
	&lt;includeBaseDirectory&gt;false&lt;/includeBaseDirectory&gt;
	&lt;dependencySets&gt;
		&lt;dependencySet&gt;
			&lt;unpack&gt;false&lt;/unpack&gt;
			&lt;scope&gt;runtime&lt;/scope&gt;
			&lt;outputDirectory&gt;lib&lt;/outputDirectory&gt;
			&lt;excludes&gt;
				&lt;exclude&gt;${groupId}:${artifactId}&lt;/exclude&gt;
			&lt;/excludes&gt;
		&lt;/dependencySet&gt;
		&lt;dependencySet&gt;
			&lt;unpack&gt;true&lt;/unpack&gt;
			&lt;includes&gt;
				&lt;include&gt;${groupId}:${artifactId}&lt;/include&gt;
			&lt;/includes&gt;
		&lt;/dependencySet&gt;
	&lt;/dependencySets&gt;
&lt;/assembly&gt;
</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">In our pom.xml file, we just use the assembly file as our descriptor for the <a href="http://maven.apache.org/plugins/maven-assembly-plugin/">assembly plugin</a>, and add all the regular dependencies. This will assemble all the dependencies within a lib directory inside our output target jar:</p>
<pre title="code" class="brush: xhtml;">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;project xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot; xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd&quot;&gt;
	&lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
	&lt;groupId&gt;com.tikal.fuseday.bigdata&lt;/groupId&gt;
	&lt;artifactId&gt;genome&lt;/artifactId&gt;
	&lt;packaging&gt;jar&lt;/packaging&gt;
	&lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
	&lt;properties&gt;
		&lt;server.deploy.dir&gt;UTF-8&lt;/server.deploy.dir&gt;
	&lt;/properties&gt;


	&lt;dependencies&gt;
		&lt;dependency&gt;
				&lt;groupId&gt;com.google.guava&lt;/groupId&gt;
				&lt;artifactId&gt;guava&lt;/artifactId&gt;
				&lt;version&gt;12.0&lt;/version&gt;
		&lt;/dependency&gt;
			
		&lt;dependency&gt;
			&lt;groupId&gt;org.apache.hadoop&lt;/groupId&gt;
			&lt;artifactId&gt;hadoop-core&lt;/artifactId&gt;
			&lt;version&gt;1.0.3&lt;/version&gt;
			&lt;scope&gt;provided&lt;/scope&gt;
		&lt;/dependency&gt;
		&lt;dependency&gt;
			&lt;groupId&gt;org.mockito&lt;/groupId&gt;
			&lt;artifactId&gt;mockito-core&lt;/artifactId&gt;
			&lt;version&gt;1.8.5&lt;/version&gt;
			&lt;scope&gt;test&lt;/scope&gt;
		&lt;/dependency&gt;
		&lt;dependency&gt;
			&lt;groupId&gt;junit&lt;/groupId&gt;
			&lt;artifactId&gt;junit&lt;/artifactId&gt;
			&lt;version&gt;4.7&lt;/version&gt;
			&lt;scope&gt;test&lt;/scope&gt;
		&lt;/dependency&gt;
	&lt;/dependencies&gt;

	&lt;build&gt;
		&lt;plugins&gt;
			&lt;plugin&gt;
				&lt;artifactId&gt;maven-compiler-plugin&lt;/artifactId&gt;
				&lt;configuration&gt;
					&lt;source&gt;1.6&lt;/source&gt;
					&lt;target&gt;1.6&lt;/target&gt;
				&lt;/configuration&gt;
			&lt;/plugin&gt;
			&lt;plugin&gt;
				&lt;artifactId&gt;maven-assembly-plugin&lt;/artifactId&gt;
				&lt;version&gt;2.2-beta-5&lt;/version&gt;
				&lt;configuration&gt;
					&lt;descriptors&gt;
						&lt;descriptor&gt;src/main/assembly/hadoop-job.xml&lt;/descriptor&gt;
					&lt;/descriptors&gt;
					&lt;archive&gt;
						&lt;manifest&gt;
							&lt;mainClass&gt;com.tikal.fuseday.hadoop.GenomeMapReduce&lt;/mainClass&gt;
						&lt;/manifest&gt;
					&lt;/archive&gt;
				&lt;/configuration&gt;
				&lt;executions&gt;
					&lt;execution&gt;
						&lt;id&gt;make-assembly&lt;/id&gt;
						&lt;phase&gt;package&lt;/phase&gt;
						&lt;goals&gt;
							&lt;goal&gt;single&lt;/goal&gt;
						&lt;/goals&gt;
					&lt;/execution&gt;
				&lt;/executions&gt;
			&lt;/plugin&gt;
		&lt;/plugins&gt;
	&lt;/build&gt;

&lt;/project&gt;
</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">Last step is to write the <a href="http://en.wikipedia.org/wiki/MapReduce">MapReduce</a> program. MapReduce is at the heart of Hadoop framework, and serves as the engine for processing your data. We decided to write our MapReduce in order to analyze the <a href="http://www.ncbi.nlm.nih.gov/genbank/">GenBank</a> data, trying to create a length's <a href="http://en.wikipedia.org/wiki/Histogram">histogram</a> for the <a href="http://Nucleotide/">Nucleotide</a> available there (dozens of billions).</p>
<p style="margin-bottom: 0cm">This data can also be found in <a href="http://aws.amazon.com/datasets/2261?_encoding=UTF8&amp;queryArg=searchQuery&amp;x=0&amp;fromSearch=1&amp;y=0&amp;searchPath=datasets&amp;searchQuery=genbank">Amazon public data</a>, but our first step was to create a program that we can run and test locally, and only then run it in AWS.</p>
<p style="margin-bottom: 0cm">As a sample data we downloaded 20 Nucleotide from the <a href="http://www.ncbi.nlm.nih.gov/nuccore">GenBank search page</a>. We noticed the downloaded file is with <a href="FASTA_format">Fasta format</a> - begins with a single-line description, followed by lines of sequence data. Since this is a special format,&nbsp;</p>
<p style="margin-bottom: 0cm">The logic for Map class is to take the a rounded length of the data as our Map key and the numerical value &ldquo;one&rdquo; as the value of the Map. Then the reducer just need to sum all the &ldquo;one&rdquo; values. Here is the simple MapReduce program:</p>
<pre title="code" class="brush: java;">
public final class GenomeMapReduce extends Configured implements Tool {

	public static void main(String[] args) throws Exception {
		int res = ToolRunner.run(new Configuration(), new GenomeMapReduce(), args);
		System.exit(res);
	}

	public static class MapClass extends MapReduceBase implements Mapper&lt;Text, Text, IntWritable, IntWritable&gt; {
		private IntWritable lineLength = new IntWritable();
		
		private static final IntWritable one = new IntWritable(1);
		@Override
		public void map(Text key, Text value, OutputCollector&lt;IntWritable, IntWritable&gt; output, Reporter reporter) throws IOException {
			lineLength.set(1000*(value.toString().length()/1000));
			output.collect(lineLength, one);
		}
	}

	public static class Reduce extends MapReduceBase implements Reducer&lt;IntWritable, IntWritable, IntWritable, IntWritable&gt; {
		@Override
		public void reduce(IntWritable key, Iterator&lt;IntWritable&gt; values, OutputCollector&lt;IntWritable, IntWritable&gt; output, Reporter reporter)throws IOException {
			int count = 0;
			while (values.hasNext())
				count += values.next().get();
			output.collect(key, new IntWritable(count));
		}
	}

	@Override
	public int run(String[] args) throws Exception {
		Configuration conf = getConf();
		JobConf job = new JobConf(conf, GenomeMapReduce.class);
		Path in = new Path(args[0]);
		Path out = new Path(args[1]);
		FileInputFormat.setInputPaths(job, in);
		FileOutputFormat.setOutputPath(job, out);
		job.setJobName(&quot;GenomeMapReduceJob&quot;);
		job.setMapperClass(MapClass.class);
		job.setReducerClass(Reduce.class);
		job.setInputFormat(FastaInputFormat.class);
		job.setOutputFormat(TextOutputFormat.class);
		job.setOutputKeyClass(IntWritable.class);
		job.setOutputValueClass(IntWritable.class);
		JobClient.runJob(job);
		return 0;
	}

}</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">Now, all you need to do is run &ldquo;mvn install&rdquo;, and you will have a jar file containing our compiled class and its dependencies in the lib directory within this jar.</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">In order to run this, you need to put the downloaded data file <a href="http://hadoop.apache.org/hdfs/">within HDFS</a> &ndash; The Hadoop special file system:</p>
<pre title="code" class="brush: java;">
hadoop fs -put /Users/yanaif/Downloads/sequence.fasta /user/yanaif/sequence.fasta</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">Then, you can run your created job in your Hadoop &ldquo;pseudo distributed&rdquo; within your machine:</p>
<pre title="code" class="brush: java;">
hadoop jar target/genome-1.0-SNAPSHOT-job.jar /user/yanaif/sequence.fasta genome-output</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">In order to inspect the output you can cat the output file:</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<pre title="code" class="brush: java;">
hadoop fs -cat genome-output/part-00000</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<pre title="code" class="brush: java;">
1000	4
2000	3
3000	9
4000	2
5000	1
6000	1</pre>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">Putting this data in Excel can produce the following sample frequency Nucleotide length histogram,&nbsp;Putting this data in Excel can produce the following sample frequency Nucleotide length histogram, and reveal frequencies and their distribution:</p>
<p style="margin-bottom: 0cm"><a href="/files/upload/27/genome.jpg"><img src="/files/upload/27/genome.jpg" width="600" height="325" alt="" /></a></p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">Now, we are ready to deploy our self contained jar, in AWS and run it against the &ldquo;real&rdquo; data set, which contain 200GB. We'll discuss this on our next post.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
